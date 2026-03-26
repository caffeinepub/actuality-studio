import { r as reactExports } from "./index-FFX2L6Pj.js";
const STORAGE_KEY = "actuality-discount-rates";
const DEFAULT_RATES = {
  trial: 5,
  cohort: 10,
  patronPro: 20,
  sponsor: 30
};
function loadRates() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_RATES, ...parsed };
    }
  } catch {
  }
  return DEFAULT_RATES;
}
function useDiscountRates() {
  const [rates, setRatesState] = reactExports.useState(loadRates);
  const setRates = reactExports.useCallback((newRates) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRates));
    setRatesState(newRates);
  }, []);
  const resetRates = reactExports.useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRatesState(DEFAULT_RATES);
  }, []);
  return { rates, setRates, resetRates };
}
export {
  DEFAULT_RATES as D,
  useDiscountRates as u
};
