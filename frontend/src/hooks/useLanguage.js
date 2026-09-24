import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STRINGS } from '../i18n/strings';

const STORAGE_KEY = 'app_lang';
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  // Restore the last choice; failure to read just leaves the default.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (saved && STRINGS[saved]) setLangState(saved);
      })
      .catch(() => {});
  }, []);

  const setLang = useCallback((next) => {
    if (!STRINGS[next]) return;
    setLangState(next);
    AsyncStorage.setItem(STORAGE_KEY, next).catch(() => {});
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: STRINGS[lang] }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** const { t, lang, setLang } = useLanguage(); t.goBack, t.spotsLeft(19) ... */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
