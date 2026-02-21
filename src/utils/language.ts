export const detectBrowserLanguage = (): string => {
  if (typeof window === 'undefined') {
    return 'en';
  }
  return navigator.language || navigator.languages?.[0] || 'en';
};

export const setLanguageToStorage = (language: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userLanguage', language);
  }
};

export const getLanguageFromStorage = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('userLanguage');
};
