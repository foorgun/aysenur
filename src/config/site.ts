export const SITE = {
  name: 'yilmazkan Interior Design',
  wordmark: 'yilmazkan',
  // Bewusst ausgeschrieben statt per CSS-uppercase (im Original-Logo steht der Tippfehler „DESING")
  tagline: 'INTERIOR DESIGN',
  owner: 'Ayşenur Yılmazkan',
  whatsapp: '905488299549', // bestätigt
  phoneDisplay: '+90 548 829 95 49',
  email: 'a.yilmazkan35@gmail.com',
  instagram: 'designer.ayilmazkan',
  locations: ['Lefkoşa / KKTC', 'Bornova / İzmir'],
  serviceArea: { tr: 'Türkiye geneli & KKTC', en: 'All of Türkiye & Northern Cyprus' },
  software: ['AutoCAD', 'SketchUp', '3ds Max', 'Corona Renderer', 'Enscape'],
  ogImage: '/og.jpg',
} as const;

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const instagramUrl = `https://instagram.com/${SITE.instagram}`;
export const mailtoUrl = `mailto:${SITE.email}`;

// Anker der One-Pager-Sektionen – in beiden Sprachen identisch, damit der Sprachumschalter die Sektion behält
export const SECTIONS = ['services', 'packages', 'compare', 'projects', 'process', 'about', 'contact'] as const;
export type SectionId = (typeof SECTIONS)[number];

// Reihenfolge der Hauptnavigation (CLAUDE.md §7)
export const NAV = ['services', 'packages', 'projects', 'about', 'contact'] as const satisfies readonly SectionId[];
