// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import vi from '../translation/vi/vi.json';

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        // defaultNS: "ns1";
        // custom resources type
        resources: {
            vi: typeof vi;
        };

        // other
    }
}
