export const aiService = {
  chat: async (message: string) => {
    // Mock response for now until an API key is provided
    return `This is a simulated AI response to your message: "${message}". In the future, this will be connected to an LLM provider (e.g. OpenAI).`;
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
