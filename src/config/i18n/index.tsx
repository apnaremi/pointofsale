import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// @ts-ignore
import en from '../../assets/locales/en.json';
const resources = {
  en: en,
};
i18n.use(initReactI18next).init({
  lng: 'en',
  debug: __DEV__,
  resources,
  interpolation: {
    escapeValue: false, // not needed for react
  },
});

export default i18n;
