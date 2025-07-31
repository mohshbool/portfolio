export const detectBrowserLanguage = (): string => {
  return navigator.language || navigator.languages?.[0] || 'en';
};

export const setLanguageToStorage = (language: string): void => {
  localStorage.setItem('userLanguage', language);
};

export const getLanguageFromStorage = (): string | null => {
  return localStorage.getItem('userLanguage');
};
