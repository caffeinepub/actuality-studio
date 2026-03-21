import { useCallback, useState } from "react";

const STORAGE_KEY = "actuality-saved-catalog";

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

export function useSavedCatalog() {
  const [savedIds, setSavedIds] = useState<string[]>(readIds);

  const saveItem = useCallback((id: string) => {
    setSavedIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeIds(next);
      return next;
    });
  }, []);

  const unsaveItem = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.filter((x) => x !== id);
      writeIds(next);
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  );

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      writeIds(next);
      return next;
    });
  }, []);

  return { savedIds, saveItem, unsaveItem, isSaved, toggleSave };
}
