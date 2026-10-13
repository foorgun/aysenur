import tr from './tr.json';
import en from './en.json';

export const LOCALES = ['tr', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'tr';

const dictionaries = { tr, en } as const;

type Dict = typeof tr;
type Leaves<T, P extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${P}${K}` : Leaves<T[K], `${P}${K}.`>;
}[keyof T & string];
export type TKey = Leaves<Dict>;

const lookup = (dict: unknown, key: string): string | undefined => {
  const value = key
    .split('.')
    .reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], dict);
  return typeof value === 'string' ? value : undefined;
};

/** `t('whatsapp.project', { name })` – fällt auf Türkisch zurück, falls ein Schlüssel in EN fehlt. */
export function useTranslations(lang: Lang) {
  return function t(key: TKey, vars: Record<string, string> = {}): string {
    const template = lookup(dictionaries[lang], key) ?? lookup(dictionaries[DEFAULT_LANG], key) ?? key;
    return template.replace(/\{(\w+)\}/g, (match, name: string) => vars[name] ?? match);
  };
}

/** Zweisprachiges Inhaltsfeld (`{ tr, en }`) → Wert der aktuellen Sprache. */
export const pick = <T,>(field: Record<Lang, T>, lang: Lang): T => field[lang];

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return first === 'en' ? 'en' : DEFAULT_LANG;
}

// Übersetzte Pfadsegmente: TR-Segment → EN-Segment
const SEGMENTS_TR_EN: Record<string, string> = { projeler: 'projects', gizlilik: 'privacy' };
const SEGMENTS_EN_TR = Object.fromEntries(Object.entries(SEGMENTS_TR_EN).map(([a, b]) => [b, a]));

/** Sprachneutraler (türkischer) Pfad → Pfad in der Zielsprache, z. B. `/projeler/lobi/` → `/en/projects/lobi/`. */
export function localizedPath(path: string, lang: Lang): string {
  const segments = path.split('/').filter(Boolean);
  if (lang === DEFAULT_LANG) return segments.length ? `/${segments.join('/')}/` : '/';
  const translated = segments.map((segment, i) => (i === 0 ? (SEGMENTS_TR_EN[segment] ?? segment) : segment));
  return `/${['en', ...translated].join('/')}/`;
}

/** Aktuelle URL → gleiche Seite in der anderen Sprache. */
export function alternatePath(pathname: string, target: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  const isEn = segments[0] === 'en';
  const rest = isEn ? segments.slice(1) : segments;
  const neutral = rest.map((segment, i) => (isEn && i === 0 ? (SEGMENTS_EN_TR[segment] ?? segment) : segment));
  return localizedPath(`/${neutral.join('/')}`, target);
}

/** TR `3.000 ₺`, EN `₺3,000` */
export function formatPrice(amount: number, lang: Lang): string {
  return lang === 'tr'
    ? `${new Intl.NumberFormat('tr-TR').format(amount)} ₺`
    : `₺${new Intl.NumberFormat('en-US').format(amount)}`;
}

/** Bildbreiten für `astro:assets`, nie größer als das Original (Bilder stammen aus dem PDF, siehe CLAUDE.md §9). */
export function safeWidths(originalWidth: number, candidates: number[] = [360, 540, 720, 960]): number[] {
  return [...candidates.filter((width) => width < originalWidth), originalWidth];
}
