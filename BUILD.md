# BUILD.md – Bauplan yilmazkan Interior Design

Schritt-für-Schritt-Plan für Claude Code. Phasen der Reihe nach abarbeiten, nach jeder Phase `npm run build` und Checkbox abhaken.
Projektkontext und Regeln stehen in `CLAUDE.md`.

---

## Phase 0 – Setup

- [x] Astro-Projekt anlegen: `npm create astro@latest . -- --template minimal --typescript strict`
- [x] Tailwind hinzufügen: `npx astro add tailwind`
- [x] Sitemap: `npx astro add sitemap`
- [x] i18n in `astro.config.mjs`:
  ```js
  i18n: { defaultLocale: 'tr', locales: ['tr', 'en'], routing: { prefixDefaultLocale: false } }
  ```
- [x] `site` in Config auf die finale Domain setzen. Empfehlung: **`aysenuryilmazkan.com`** (Alternativen: `yilmazkan.design`, `yilmazkaninterior.com`) – Verfügbarkeit prüfen, bis dahin `TODO(content): Domain`
- [x] `assets-raw.zip` im Projekt-Root entpacken → `assets-raw/<slug>/…` (Ordner ist in `.gitignore`)
- [x] Ordnerstruktur:
  ```
  src/
    assets/projects/<slug>/      # optimierte Projektbilder
    assets/brand/                # Logo (korrigiert: INTERIOR DESIGN), Textur
    components/                  # Header, Hero, Services, Packages, BeforeAfter, Gallery, Process, About, Contact, Footer, WhatsAppFloat, LangSwitch
    config/site.ts               # Nummer, E-Mail, Instagram, Domain
    content/projects/*.md        # Projekt-Daten (Frontmatter tr/en)
    content/packages/*.md        # Paket-Daten (Frontmatter tr/en)
    i18n/tr.json, en.json        # UI-Strings
    i18n/utils.ts                # t(), getLangFromUrl(), localizedPath()
    layouts/BaseLayout.astro     # <head>, SEO, hreflang, Fonts
    pages/index.astro            # TR
    pages/en/index.astro         # EN
    pages/projeler/[slug].astro  # TR-Detail
    pages/en/projects/[slug].astro
  ```
- [x] Git initialisieren, `.gitignore` inkl. `/assets-raw`

## Phase 1 – Design-System & Layout

- [x] Tailwind-Theme mit Farben aus `CLAUDE.md` §6 (als CSS-Variablen)
- [x] Google Fonts: Script-Font für Display + Quicksand/Jost für Text (`latin-ext` Subset für Türkisch!)
- [x] `BaseLayout.astro`: Meta, OG, hreflang, `lang`-Attribut, Favicon
- [x] Wiederkehrendes Element: taupefarbenes horizontales Band (wie im Logo)
- [x] Subtile Seiden-Hintergrundtextur (komprimiert, < 80 KB) für Hero/Sektionstrenner

## Phase 2 – Konfiguration & i18n

- [x] `src/config/site.ts`:
  ```ts
  export const SITE = {
    name: 'yilmazkan Interior Design',
    owner: 'Ayşenur Yılmazkan',
    whatsapp: '905488299549',          // bestätigt
    email: 'a.yilmazkan35@gmail.com',
    instagram: 'designer.ayilmazkan',
    locations: ['Lefkoşa / KKTC', 'Bornova / İzmir'],
    serviceArea: { tr: 'Türkiye geneli & KKTC', en: 'All of Türkiye & Northern Cyprus' },
  };
  export const waLink = (text: string) =>
    `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
  ```
- [x] `tr.json` / `en.json` mit allen UI-Strings (Navigation, CTAs, Sektionstitel, WhatsApp-Vorlagetexte, Footer)
- [x] `LangSwitch`-Komponente: wechselt auf gleiche Seite in anderer Sprache

## Phase 3 – Komponenten (One-Pager)

- [ ] `Header` – sticky, transparent über Hero → solid beim Scrollen, Burger-Menü mobil
- [ ] `Hero` – **Split-Layout** (Bilder sind nur ~900–1300 px groß, siehe `CLAUDE.md` §9): links Script-Titel, Claim, Badge „Türkiye geneli & KKTC · Online", Primär-CTA WhatsApp, Sekundär „Projeleri Gör"; rechts `1-1-ev-tasarimi-a/01.jpg` auf Seiden-Textur
  - TR-Claim-Vorschlag: „Yaşam alanınızı size özel, sade ve sıcak tasarımlarla dönüştürüyorum."
  - EN-Claim-Vorschlag: „Calm, warm interiors designed around the way you live."
- [ ] `Services` – 6 Kacheln (Icon + Titel + 1 Satz), siehe Inhalte unten
- [ ] `Packages` – Karten aus `content/packages`, jede mit Leistungsliste, Hinweisen, Preis/„Fiyat için yazın", eigenem WhatsApp-CTA (Paketname im Text)
- [ ] `BeforeAfter` – Slider Render ↔ echtes Foto mit 4 Paaren: `dentaline-klinik`, `lobi`, `dis-cephe/on-*`, `dis-cephe/aci-*`. Bilder je Paar vorher auf gleiche Größe/Ausschnitt zuschneiden (sharp oder Pillow). Touch-fähig, Tastatur-bedienbar. Labels: „3D Render" / „Gerçek Uygulama" (EN: „3D Render" / „Built")
- [ ] `Gallery` – Raster mit Filter (Konut / Ticari / Dış Cephe & Plan), Lightbox
- [ ] `Process` – 4 Schritte
- [ ] `About` – Foto, Kurzbio, Software-Badges, Ausbildung
- [ ] `Contact` – große WhatsApp-Karte + E-Mail + Instagram + Standorte + Hinweis „Türkiye'nin her yerinden ve KKTC'den online çalışıyorum". **Kein Formular.**
- [ ] `Footer` – Logo, Navigation, Social, Impressum/Datenschutz, ©
- [ ] `WhatsAppFloat` – siehe `CLAUDE.md` §8

## Phase 4 – Projekte

- [ ] Je Projekt eine Markdown-Datei in `content/projects/` mit Frontmatter:
  ```yaml
  slug: steakhouse
  category: ticari        # konut | ticari | dis-cephe
  title: { tr: "Steakhouse Tasarımı", en: "Steakhouse Design" }
  summary: { tr: "...", en: "..." }
  location: "TODO(content)"
  year: "TODO(content)"
  cover: ../../assets/projects/steakhouse/cover.jpg
  images: [...]
  hasRealPhoto: false
  ```
- [ ] Projektliste (aus dem Portfolio, alle selbst umgesetzt) – Bilder liegen in `assets-raw/<slug>/`:
  | Slug | TR | EN | Kategorie | Bilder |
  |---|---|---|---|---|
  | 1-1-ev-tasarimi-a | 1+1 Ev Tasarımı (Ahşap & Kemer) | One-Bedroom Apartment – Arched Niches | konut | 01–03 |
  | 1-1-ev-tasarimi-b | 1+1 Ev Tasarımı (Balıksırtı Parke) | One-Bedroom Apartment – Herringbone | konut | 01–05 |
  | 1-0-studyo | 1+0 Stüdyo Daire | Studio Apartment | konut | 01-plan, 02, 03-plan, 04, 05 |
  | steakhouse | Steakhouse Tasarımı | Steakhouse Design | ticari | 01–06, 07-panorama |
  | banyo | Banyo Tasarımı | Bathroom Design | konut | 01–03 |
  | dentaline-klinik | Diş Kliniği – Dentaline | Dental Clinic – Dentaline | ticari | render, gercek |
  | lobi | Lobi / Bekleme Alanı | Lobby / Lounge | ticari | render, gercek |
  | plan-gorsellestirme | Kat Planı Görselleştirme | Floor Plan Visualization | dis-cephe | 01, 02-zemin, 03 |
  | dis-cephe | Dış Cephe Tasarımı – Gerçek Residence | Façade Design – Gerçek Residence | dis-cephe | on-/aci- render + gercek |
- [ ] `hasRealPhoto: true` für `dentaline-klinik`, `lobi`, `dis-cephe` → Badge „Hayata geçti" / „Built" auf der Kachel
- [ ] Detailseiten TR (`/projeler/[slug]`) und EN (`/en/projects/[slug]`), mit „Benzer bir proje için yazın"-CTA

## Phase 5 – Inhalte (Texte)

### Hizmetler / Services
| TR | EN |
|---|---|
| İç Mekan Tasarımı | Interior Design |
| 3D Görselleştirme & Render | 3D Visualization & Rendering |
| 2D Yerleşim Planı | 2D Space Planning |
| Ticari Mekan Tasarımı (restoran, klinik, ofis) | Commercial Interiors (restaurants, clinics, offices) |
| Dış Cephe Tasarımı | Exterior & Façade Design |
| Online Birebir Danışmanlık | Online 1:1 Consultation |

### Paketler / Packages (Vorschlag – Preise von Ayşenur final freigeben lassen)

Datenmodell je Paket (`content/packages/<slug>.md`): `order`, `title{tr,en}`, `tagline{tr,en}`, `features{tr[],en[]}`, `notes{tr[],en[]}`, `price` (Zahl, TL), `priceFrom` (bool), `showPrice` (bool), `highlight` (bool), `waText{tr,en}`.
Preisformat: TR `3.000 ₺`, EN `₺3,000`. Bei `priceFrom` → TR „… ₺'den başlayan", EN „from …". Bei `showPrice: false` → „Fiyat için yazın" / „Ask for a quote".

**1. Online Danışmanlık · Online Consultation** — `3.000 ₺` · `online`
- TR: 1 saatlik birebir görüntülü görüşme · Mobilya seçimi, renk ve malzeme uyumu · Mekânı daha ferah gösterecek öneriler · Görüşme sonrası kısa özet notu
- EN: 1-hour one-to-one video call · Furniture, colour and material advice · Ideas to make your space feel larger and calmer · Short written summary after the call
- Not: Çizim ve 3D içermez / No drawings or 3D included

**2. 2D Yerleşim Planı · 2D Space Plan** — `4.500 ₺` · tek oda / per room
- TR: İhtiyaç görüşmesi · Ölçülerinize göre 2 alternatif yerleşim planı · Alacağınız mobilyalar için net ölçü listesi · 1 revizyon hakkı
- EN: Brief call · 2 layout options based on your measurements · Exact furniture size guide for shopping · 1 revision
- Not: 3D görselleştirme dahil değildir / 3D not included

**3. 3D Oda Tasarımı · 3D Room Design** — `12.000 ₺'den` · tek oda / per room · `highlight: true` („En çok tercih edilen" / „Most popular")
- TR: 2D yerleşim planı · 3D modelleme · 4 fotogerçekçi render · Renk, malzeme ve mobilya listesi (satın alma linkleriyle) · 2 revizyon hakkı
- EN: 2D layout · 3D model · 4 photorealistic renders · Colour, material and furniture list with shopping links · 2 revisions

**4. Komple Konut Tasarımı · Full Home Design** — `showPrice: false` („Teklif alın")
- TR: 1+0'dan 3+1'e tüm alanlar · 3D render ve teknik çizimler (dolap, aydınlatma, mobilya detayları) · Uygulama sürecinde danışmanlık
- EN: All rooms, studio to 3-bedroom · 3D renders and technical drawings (joinery, lighting, furniture details) · Support during implementation

**5. Ticari Mekan & Dış Cephe · Commercial & Façade** — `showPrice: false`
- TR: Restoran, klinik, ofis, mağaza ve konut projeleri için iç mekan, kat planı görselleştirme ve dış cephe tasarımı
- EN: Interiors, floor plan visualization and façade design for restaurants, clinics, offices, retail and residential developments

Gemeinsame Hinweise unter den Karten:
- TR: „Tüm online paketler Türkiye'nin her yerinden ve KKTC'den alınabilir. Fiyatlar tek oda içindir." 
- EN: „All online packages are available anywhere in Türkiye and Northern Cyprus. Prices are per room."
- `TODO(content)`: KDV-Hinweis klären (dahil / hariç / nicht anwendbar)

### Süreç / Process
1. Tanışma görüşmesi / Discovery call
2. Ölçü & ihtiyaç analizi / Measurements & brief
3. Konsept, plan ve 3D tasarım / Concept, plan & 3D design
4. Teslim ve uygulama desteği / Delivery & implementation support

## Phase 6 – SEO, Recht, Performance

- [ ] Titel/Description je Sprache, z. B. TR: „Ayşenur Yılmazkan | İç Mimar – Online İç Mimarlık, Türkiye & KKTC", EN: „Ayşenur Yılmazkan | Interior Designer – Türkiye & Northern Cyprus"
- [ ] Keywords in Texten natürlich einbauen: „online iç mimar", „3D iç mekan tasarımı", „yerleşim planı", „Lefkoşa iç mimar", „İzmir iç mimar", „KKTC iç mimar"
- [ ] JSON-LD `ProfessionalService` (Name, areaServed: Türkiye + Northern Cyprus, address-Ort Lefkoşa / İzmir ohne Straße; sameAs Instagram)
- [ ] OG-Bild 1200×630 (Hero-Render mit Logo)
- [ ] `robots.txt`, Sitemap mit hreflang
- [ ] Gizlilik / KVKK-Aydınlatma & Impressum-Seite (Inhalte: TODO mit Kundin klären)
- [ ] Bilder: max. 2400 px Breite in `src/assets`, `astro:assets` erzeugt Varianten
- [ ] Lighthouse mobil prüfen (Ziele in `CLAUDE.md` §10)

## Phase 7 – QA

- [ ] Alle WhatsApp-Links auf echtem Handy testen (TR und EN, Paket-Texte korrekt vorausgefüllt)
- [ ] Sprachumschalter auf jeder Seite
- [ ] Türkische Zeichen & Großschreibung (İ/ı) korrekt
- [ ] Mobile 360 px, Tablet, Desktop
- [ ] Tastaturnavigation (Slider, Lightbox, Menü), Fokus sichtbar
- [ ] Keine `TODO(content)` mehr im Build → sonst Liste an Furkan ausgeben

## Phase 8 – Deployment

- [ ] Repo zu GitHub, Vercel/Netlify verbinden
- [ ] Domain verbinden (`TODO(content)`), HTTPS
- [ ] Google Business Profile / Instagram-Bio-Link auf die Website setzen (Hinweis an Kundin)

---

## Offene Inhalte (Sammelliste)

- [x] WhatsApp-Nummer bestätigt
- [x] Projekte selbst realisiert – bestätigt
- [x] Bilder aus PDF extrahiert (`assets-raw.zip`) – keine Originale vorhanden
- [ ] Domain kaufen (Empfehlung `aysenuryilmazkan.com`)
- [ ] Paketpreise von Ayşenur freigeben lassen + KDV-Hinweis
- [ ] Logo: korrigiertes „INTERIOR DESIGN" – bis dahin Logo als HTML/CSS nachbauen (Script-Wortmarke + Untertitel)
- [ ] Projektdetails (Ort, Jahr, 1–2 Sätze) je Projekt
