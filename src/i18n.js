import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { getLang } from './_support/helper';
import { BASENAME } from './config';

i18n
    // load translation using http -> see /public/locales
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: false,
        lng: getLang(),
        fallbackLng: 'en',
        ns: "",
        backend: {
            // path where resources get loaded from
            loadPath: window.location.origin + BASENAME+ '/langs/{{lng}}.json',
            // path to post missing resources
            // addPath:  'http://127.0.0.1:8000/api/langs/{{lng}}',
        },
        react: {
            wait: true,
            useSuspense: false,
        },
        saveMissing: false,
    });

/**
 * add custom header 
 */
i18n.services.backendConnector.backend.options.customHeaders = {
    // Authorization: window.localStorage.getItem('auth_token'),
}

export default i18n;