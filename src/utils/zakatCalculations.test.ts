import { describe, it, expect } from 'vitest';
import { calculateGoldZakat, calculateCashZakat, NISAB_GOLD_GRAMS, ZAKAT_RATE } from './zakatCalculations';

describe('Zakat Calculations Logic', () => {
  it('should calculate gold zakat correctly when above nisab', () => {
    const goldGrams = 100; // Above 85g
    const goldPriceUSD = 60;
    const usdToLocal = 3.75; // SAR
    const result = calculateGoldZakat(goldGrams, 24, 0, goldPriceUSD, 0, usdToLocal);
    
    expect(result.reachedNisab).toBe(true);
    expect(result.zakatAmount).toBe(goldGrams * goldPriceUSD * usdToLocal * ZAKAT_RATE);
  });

  it('should return 0 zakat when below gold nisab', () => {
    const goldGrams = 80; // Below 85g
    const result = calculateGoldZakat(goldGrams, 24, 0, 60, 0, 3.75);
    
    expect(result.reachedNisab).toBe(false);
    expect(result.zakatAmount).toBe(0);
  });

  it('should calculate cash zakat correctly with debts', () => {
    const savings = 50000;
    const receivables = 5000;
    const debts = 10000;
    const goldNisabLocal = 20000; // Sample nisab
    
    const result = calculateCashZakat(savings, receivables, debts, goldNisabLocal);
    const expectedNet = savings + receivables - debts;
    
    expect(result.totalAssets).toBe(expectedNet);
    expect(result.zakatAmount).toBe(expectedNet * ZAKAT_RATE);
  });

  it('should handle decimal values and precision correctly', () => {
    const savings = 10000.555;
    const goldNisabLocal = 5000;
    const result = calculateCashZakat(savings, 0, 0, goldNisabLocal);
    
    expect(result.zakatAmount).toBeCloseTo(savings * ZAKAT_RATE, 5);
  });
});
