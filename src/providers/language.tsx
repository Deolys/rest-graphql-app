'use client';

import { type ReactNode, createContext, useEffect, useState } from 'react';

type TLanguage = 'en' | 'ru';

interface ILanguageContext {
  toggleLanguage: () => void;
  t: { [key: string]: string };
}

const contextDefaultValue: ILanguageContext = {
  toggleLanguage: () => {},
  t: {},
};

export const LanguageContext =
  createContext<ILanguageContext>(contextDefaultValue);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<TLanguage>('en');
  const [t, setT] = useState({});

  useEffect(() => {
    fetch(`/locale/${language}.json`)
      .then((res) => res.json())
      .then((msg) => {
        setT(msg);
      });
  }, [language]);

  const toggleLanguage = (): void => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ru' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
