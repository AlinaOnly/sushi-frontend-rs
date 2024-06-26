import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../locales/index';
import { default as LanguageDetector } from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';

i18next
    .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
    .use(LanguageDetector)
    .use(Backend)  // с помощью плагина определяем язык пользователя в браузере
        .init({
        //debug: true,
        resources,  // передаем переводы текстов интерфейса в формате JSON
        lng: 'ru',
        fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
        saveMissing: false,
        interpolation: {
            escapeValue: false, // экранирование уже есть в React, поэтому отключаем
        },
    });

export default i18next;
