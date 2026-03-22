const STORAGE_KEY = "actuality-discount-rates";

export interface DiscountRates {
  trial: number;
  cohort: number;
  patronPro: number;
  sponsor: number;
}

export const DEFAULT_RATES: DiscountRates = {
  trial: 5,
  cohort: 10,
  patronPro: 20,
  sponsor: 30,
};

function loadRates(): DiscountRates {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_RATES, ...parsed };
    }
  } catch {
    // ignore
  }
  return DEFAULT_RATES;
}

import { useCallback, useState } from "react";

export function useDiscountRates(): {
  rates: DiscountRates;
  setRates: (rates: DiscountRates) => void;
  resetRates: () => void;
} {
  const [rates, setRatesState] = useState<DiscountRates>(loadRates);

  const setRates = useCallback((newRates: DiscountRates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRates));
    setRatesState(newRates);
  }, []);

  const resetRates = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRatesState(DEFAULT_RATES);
  }, []);

  return { rates, setRates, resetRates };
}
