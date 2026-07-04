import { policyService } from '../policies/service';
import prisma from '../../config/prisma';
import { paymentService } from '../payments/service';
import { clientService } from '../clients/service';

export const aiService = {
  chat: async (message: string) => {
    // simulated tool-calling router
    console.log(`[AI Copilot] Processing intent for: "${message}"`);
    
    const lowerMessage = message.toLowerCase();
    let responseText = '';
    
    // 1. Map intent to Tool
    if (lowerMessage.includes('claim') && lowerMessage.match(/\d+/)) {
      // Intent: getClaimDetails
      const claimId = lowerMessage.match(/\d+/)?.[0] || '1';
      try {
        const claim = await prisma.claim.findFirst({
          where: { claimNumber: { contains: claimId } }
        });
        if (claim) {
          responseText = `Claim #${claim.claimNumber} is currently ${claim.status}. The claim amount is ₹${claim.claimAmount}.`;
        } else {
          responseText = `I couldn't find a claim with ID ${claimId}.`;
        }
      } catch (e) {
        responseText = `I couldn't find a claim with ID ${claimId}.`;
      }
    } 
    else if (lowerMessage.includes('policy') && lowerMessage.includes('revenue')) {
      // Intent: getRevenue
      const payments = await paymentService.list({ paymentStatus: 'SUCCESS', limit: 100 });
      const total = payments.items.reduce((sum, p) => sum + Number(p.amount), 0);
      responseText = `The total collected premium revenue across all successful payments is ₹${total}.`;
    }
    else if (lowerMessage.includes('client')) {
      // Intent: getClients
      const clients = await clientService.list({ limit: 5 });
      responseText = `I found ${clients.total} clients. The recent ones are: ${clients.items.map(c => `${c.firstName} ${c.lastName}`).join(', ')}.`;
    }
    else {
      responseText = `This is a simulated AI tool-calling response. I understood your message: "${message}". In the future, this will use OpenAI SDK function calling to automatically map to: getPolicies, getClaims, getRevenue, etc.`;
    }

    return responseText;
  },
  
  premiumAdvisor: async (data: any) => {
    return {
      recommendedCompany: "Mock Insurance Co.",
      recommendedPlan: "Comprehensive Health",
      expectedPremium: 12500,
      reason: "Based on the provided age and budget, this plan offers the best coverage."
    };
  },

  policyComparison: async (policies: string[]) => {
    return [
      { name: policies[0] || "Policy A", premium: 10000, coverage: "5L", pros: ["Good network"], cons: ["High waiting period"] },
      { name: policies[1] || "Policy B", premium: 12000, coverage: "7L", pros: ["Low waiting period"], cons: ["Expensive"] }
    ];
  }
};
