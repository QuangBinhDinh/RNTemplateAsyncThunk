import dict from './vi/vi.json';

// Typescript for JSON: https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript

type GetDictValue<T extends string, O> = T extends `${infer A}.${infer B}`
    ? A extends keyof O
        ? GetDictValue<B, O[A]>
        : never
    : T extends keyof O
    ? O[T]
    : never;

declare function trans<P extends DeepLeafKeys<typeof dict>>(p: P, option?: any): GetDictValue<P, typeof dict>;

type DeepKeys<T> = T extends object
    ? {
          [K in keyof T]-?: `${K & string}` | Concat<K & string, DeepKeys<T[K]>>;
      }[keyof T]
    : '';

type DeepLeafKeys<T> = T extends object ? { [K in keyof T]-?: Concat<K & string, DeepKeys<T[K]>> }[keyof T] : '';

type Concat<K extends string, P extends string> = `${K}${'' extends P ? '' : '.'}${P}`;

//Example
type T1 = DeepKeys<typeof dict>; // "footer" | "header" | "footer.copyright" | "header.logo" | "header.link"
type T2 = DeepLeafKeys<typeof dict>; // "footer.copyright" | "header.logo" | "header.link"
