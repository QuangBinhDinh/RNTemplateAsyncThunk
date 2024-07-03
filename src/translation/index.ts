import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const vi = require('./vi/vi.json');

void i18n.use(initReactI18next).init({
    resources: {
        vi,
    },
    lng: 'vi',
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    compatibilityJSON: 'v3',
    keySeparator: false, // this is the important part,
    nsSeparator: '.',
});

export default i18n;
