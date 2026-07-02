import { AppError } from "../../shared/errors/AppError";
import prisma from "../../config/prisma";
import { documentRepository } from "./repository";
import { storageService } from "./storage.service";
import type { CreateDocumentDto, UpdateDocumentDto, VerifyDocumentDto } from "./dto";
import type { DocumentType } from "@prisma/client";

export const documentService = {
  upload: async (input: CreateDocumentDto & { expenseId?: string }, file: Express.Multer.File, uploadedById: string) => {
    if (input.clientId) {
      const client = await prisma.client.findUnique({ where: { id: input.clientId } });
      if (!client) throw new AppError("Client not found", 404);
    } else if (!input.expenseId) {
      throw new AppError("Either clientId or expenseId is required", 400);
    }

    const fileUrl = await storageService.uploadFile(file);

    return documentRepository.create({
      clientId: input.clientId || null,
      policyId: input.policyId,
      quotationId: input.quotationId,
      expenseId: input.expenseId,
      documentType: input.documentType,
      fileName: file.filename,
      originalFileName: file.originalname,
      mimeType: file.mimetype,
      fileSize: file.size,
      fileUrl,
      storageProvider: "LOCAL",
      uploadedById,
      remarks: input.remarks,
    });
  },

  list: async (query: any) => {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 20);
    const skip = (page - 1) * limit;
    const search = query.search || "";
    
    const filters = {
      clientId: query.clientId,
      policyId: query.policyId,
      quotationId: query.quotationId,
      documentType: query.documentType as DocumentType | undefined,
      verificationStatus: query.verificationStatus,
    };

    const [items, total] = await Promise.all([
      documentRepository.findMany({ skip, take: limit, search, filters }),
      documentRepository.count({ search, filters })
    ]);

    return {
      items,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    };
  },

  getById: async (id: string) => {
    const doc = await documentRepository.findById(id);
    if (!doc) throw new AppError("Document not found", 404);
    return doc;
  },

  update: async (id: string, input: UpdateDocumentDto) => {
    const doc = await documentRepository.findById(id);
    if (!doc) throw new AppError("Document not found", 404);
    return documentRepository.update(id, input);
  },

  remove: async (id: string) => {
    const doc = await documentRepository.findById(id);
    if (!doc) throw new AppError("Document not found", 404);
    
    await storageService.deleteFile(doc.fileUrl);
    return documentRepository.softDelete(id);
  },

  verify: async (id: string, input: VerifyDocumentDto, verifiedById: string) => {
    const doc = await documentRepository.findById(id);
    if (!doc) throw new AppError("Document not found", 404);
    
    return documentRepository.update(id, {
      verificationStatus: input.verificationStatus,
      verifiedBy: { connect: { id: verifiedById } },
      remarks: input.remarks || doc.remarks
    });
  }
};
