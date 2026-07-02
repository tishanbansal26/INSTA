import { describe, it, expect } from 'vitest';
import { PremiumCalculatorService } from '../services/PremiumCalculator.service';

describe('PremiumCalculatorService', () => {
  const calculator = new PremiumCalculatorService();

  it('should calculate premium for a standard 30-year-old', () => {
    const result = calculator.calculate(10000, 30, 1);
    expect(result.premium).toBe(10000);
    expect(result.gst).toBe(1800);
    expect(result.total).toBe(11800);
  });

  it('should apply a 1.5x multiplier for age > 40', () => {
    const result = calculator.calculate(10000, 45, 1);
    expect(result.premium).toBe(15000);
    expect(result.gst).toBe(2700);
    expect(result.total).toBe(17700);
  });

  it('should apply a 2.0x multiplier for age > 60', () => {
    const result = calculator.calculate(10000, 65, 1);
    expect(result.premium).toBe(20000);
    expect(result.total).toBe(23600);
  });

  it('should multiply by tenure', () => {
    const result = calculator.calculate(10000, 30, 3);
    expect(result.premium).toBe(30000);
    expect(result.total).toBe(35400);
  });

  it('should throw an error for invalid base premium', () => {
    expect(() => calculator.calculate(0, 30, 1)).toThrow('Base premium must be positive');
  });

  it('should throw an error for invalid tenure', () => {
    expect(() => calculator.calculate(10000, 30, 0)).toThrow('Tenure must be at least 1 year');
  });
});
