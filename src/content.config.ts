import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ tr: z.string(), en: z.string() });
const localizedList = z.object({ tr: z.array(z.string()), en: z.array(z.string()) });

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
      category: z.enum(['konut', 'ticari', 'dis-cephe']),
      title: localized,
      summary: localized,
      description: localized,
      // Ort und Jahr werden nur angezeigt, wenn sie gesetzt sind
      location: z.string().optional(),
      year: z.string().optional(),
      // Index des Titelbilds in `images`
      cover: z.number().default(0),
      // Für Pläne/Freisteller: Bild einpassen statt beschneiden
      coverFit: z.enum(['cover', 'contain']).default('cover'),
      images: z.array(z.object({ src: image(), alt: localized, dark: z.boolean().default(false) })),
      hasRealPhoto: z.boolean().default(false),
      // Render↔Foto-Paare (gleich groß zugeschnitten, siehe scripts/prepare-compare.mjs)
      compare: z.array(z.object({ render: image(), real: image(), label: localized })).default([]),
    }),
});

const packages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/packages' }),
  schema: z.object({
    order: z.number(),
    title: localized,
    tagline: localized,
    unit: localized.optional(),
    features: localizedList,
    notes: localizedList.default({ tr: [], en: [] }),
    price: z.number().optional(),
    priceFrom: z.boolean().default(false),
    showPrice: z.boolean().default(true),
    highlight: z.boolean().default(false),
    waText: localized,
  }),
});

export const collections = { projects, packages };
