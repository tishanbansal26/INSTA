import type { PremiumRate } from "@prisma/client";

export const premiumRateMapper = {
  toResponse: (entity: PremiumRate) => {
    return {
      ...entity
    };
  }
};
