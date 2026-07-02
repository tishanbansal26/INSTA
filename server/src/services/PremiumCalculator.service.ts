export class PremiumCalculatorService {
  /**
   * Calculates the premium based on base amount, age, and tenure.
   */
  calculate(basePremium: number, age: number, tenure: number): { premium: number, gst: number, total: number } {
    if (basePremium <= 0) throw new Error("Base premium must be positive");
    if (tenure < 1) throw new Error("Tenure must be at least 1 year");

    let ageMultiplier = 1;
    if (age > 60) ageMultiplier = 2.0;
    else if (age > 40) ageMultiplier = 1.5;

    const premium = basePremium * ageMultiplier * tenure;
    const gst = premium * 0.18;
    const total = premium + gst;

    return {
      premium: Number(premium.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      total: Number(total.toFixed(2))
    };
  }
}
