import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { quotationRepository } from "./repository";
import type { CreateQuotationDto, UpdateQuotationDto } from "./dto";
import { premiumService } from "../premium/service";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const QUOTATION_VALIDITY_DAYS = 15;

const buildQuotationNumber = async (companyCode: string) => {
  const year = new Date().getFullYear();
  const count = await prisma.quotation.count({ where: { createdAt: { gte: new Date(`${year}-01-01T00:00:00.000Z`) } } });
  return `${companyCode.toUpperCase()}-Q-${year}-${String(count + 1).padStart(4, "0")}`;
};

const generatePdf = async (quotation: any, outputPath: string) => {
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);
  doc.fontSize(20).text("InsureFlow Quotation", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text(`Quotation Number: ${quotation.quotationNumber}`);
  doc.text(`Client: ${quotation.client?.firstName || ""} ${quotation.client?.lastName || ""}`);
  doc.text(`Company: ${quotation.company?.code || ""}`);
  doc.text(`Plan: ${quotation.plan?.name || ""}`);
  doc.text(`Total Premium: ${quotation.totalPremium}`);
  doc.text(`Valid Till: ${quotation.validTill?.toISOString?.() || quotation.validTill}`);
  doc.text("Terms & Conditions: This quotation is valid for 15 days and subject to underwriting review.");
  doc.end();
  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
};

export const quotationService = {
  create: async (input: CreateQuotationDto, createdById?: string) => {
    const [client, company, plan] = await Promise.all([
      prisma.client.findFirst({ where: { id: input.clientId, deletedAt: null } }),
      prisma.company.findFirst({ where: { id: input.companyId, deletedAt: null } }),
      prisma.plan.findFirst({ where: { id: input.planId, deletedAt: null } }),
    ]);

    if (!client) throw new AppError("Client not found", 404);
    if (!company) throw new AppError("Company not found", 404);
    if (!plan) throw new AppError("Plan not found", 404);
    if (plan.companyId !== company.id) throw new AppError("Selected plan does not belong to the selected company", 400);

    const premiumResult = await premiumService.calculate({
      companyId: input.companyId,
      planId: input.planId,
      age: input.age,
      sumInsured: input.sumInsured,
      tenure: input.tenure,
      gender: input.gender,
    });

    const quotationNumber = await buildQuotationNumber(company.code);
    const validTill = new Date();
    validTill.setDate(validTill.getDate() + QUOTATION_VALIDITY_DAYS);

    const quotation = await quotationRepository.create({
      quotationNumber,
      clientId: input.clientId,
      companyId: input.companyId,
      planId: input.planId,
      premiumRateId: input.premiumRateId,
      basePremium: premiumResult.basePremium,
      gst: premiumResult.gst,
      totalPremium: premiumResult.finalPremium,
      validTill,
      status: "DRAFT",
      remarks: input.remarks,
      createdById: createdById ?? input.clientId,
    });

    const pdfPath = path.join(process.cwd(), "uploads", "quotations", `${quotation.id}.pdf`);
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
    await generatePdf(quotation, pdfPath);

    return quotationRepository.update(quotation.id, { pdfPath });
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    const status = query.status as string | undefined;
    const clientId = query.clientId as string | undefined;
    const companyId = query.companyId as string | undefined;

    const [items, total] = await Promise.all([
      quotationRepository.findMany({ page, limit, search, status, clientId, companyId, skip, take: limit }),
      quotationRepository.count({ search, status, clientId, companyId }),
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  },

  getById: async (id: string) => {
    const quotation = await quotationRepository.findById(id);
    if (!quotation) throw new AppError("Quotation not found", 404);
    return quotation;
  },

  update: async (id: string, input: UpdateQuotationDto) => {
    const existing = await quotationRepository.findById(id);
    if (!existing) throw new AppError("Quotation not found", 404);
    return quotationRepository.update(id, input);
  },

  remove: async (id: string) => {
    const existing = await quotationRepository.findById(id);
    if (!existing) throw new AppError("Quotation not found", 404);
    return quotationRepository.delete(id);
  },

  approve: async (id: string) => {
    const existing = await quotationRepository.findById(id);
    if (!existing) throw new AppError("Quotation not found", 404);
    if (existing.status !== "DRAFT" && existing.status !== "SENT") {
      throw new AppError("Only draft or sent quotations can be approved", 400);
    }
    return quotationRepository.update(id, { status: "ACCEPTED" });
  },

  reject: async (id: string, remarks?: string) => {
    const existing = await quotationRepository.findById(id);
    if (!existing) throw new AppError("Quotation not found", 404);
    if (existing.status === "ACCEPTED" || existing.status === "REJECTED") {
      throw new AppError("This quotation cannot be rejected again", 400);
    }
    return quotationRepository.update(id, { status: "REJECTED", remarks: remarks ?? existing.remarks });
  },

  convertToPolicy: async (id: string) => {
    const quotation = await quotationRepository.findById(id);
    if (!quotation) throw new AppError("Quotation not found", 404);
    if (quotation.status !== "ACCEPTED") {
      throw new AppError("Only accepted quotations can be converted into policies", 400);
    }

    const policy = await prisma.policy.create({
      data: {
        policyNumber: `POL-${Date.now()}`,
        clientId: quotation.clientId,
        companyId: quotation.companyId,
        planId: quotation.planId,
        agentId: quotation.createdById,
        sumInsured: quotation.totalPremium,
        premiumAmount: quotation.totalPremium,
        gstAmount: quotation.gst,
        issueDate: new Date(),
        startDate: new Date(),
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: "PENDING",
        paymentStatus: "PENDING",
        remarks: `Converted from quotation ${quotation.quotationNumber}`,
      },
    });

    await quotationRepository.update(id, { status: "ACCEPTED" });
    return policy;
  },
};
