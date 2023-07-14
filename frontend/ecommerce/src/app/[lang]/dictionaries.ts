// import 'server-only'
 
const dictionaries = {
  en: () => import('../../i18n/en.json').then((module) => module.default),
  vi: () => import('../../i18n/vi.json').then((module) => module.default),
  zh: () => import('../../i18n/zh.json').then((module) => module.default),
  es: () => import('../../i18n/es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string | number) => await dictionaries[locale]()