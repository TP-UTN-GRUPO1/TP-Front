import React, { useState } from 'react';
import { TranslateContext } from './Translate.context';

const initialLanguage = localStorage.getItem("language");

const TranslateContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLanguage ?? "es");

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  return (
    <TranslateContext.Provider value={{ language, handleChangeLanguage }}>
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateContextProvider;