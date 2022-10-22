const KEY = "isAutoPlayEnabled" as const;
export const isEnableAutoPlay = () => localStorage.getItem(KEY) === "true";
export const setStorageValue = (boo: boolean) =>
  localStorage.setItem(KEY, String(boo));
