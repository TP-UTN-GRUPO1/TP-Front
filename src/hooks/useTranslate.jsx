import React, { useContext } from 'react'
import { TranslateContext } from '../contexts/translateContext/Translate.context'
import { translation_dictionary } from './translation.dictionary';

export const useTranslate = () => {
    const { language } = useContext(TranslateContext);
    return (key) => {
        const translation = translation_dictionary[language]
            ? translation_dictionary[language].find(t => t.key === key)?.value
            : translation_dictionary["es"].find(t => t.key === key)?.value;
        return translation || key
    }
}