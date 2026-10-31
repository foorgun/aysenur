# CLAUDE.md – yilmazkan Interior Design Website

Dieses Dokument ist der dauerhafte Projektkontext für Claude Code. Lies es zu Beginn jeder Session.
Den konkreten Bauplan (Phasen, Checklisten) findest du in `BUILD.md`.

---

## 1. Projekt in einem Satz

Zweisprachige (Türkisch / Englisch) Portfolio- und Landingpage für die freiberufliche Innenarchitektin
**Ayşenur Yılmazkan** (Marke: **yilmazkan Interior Design**), mit dem Ziel, Anfragen über **WhatsApp** zu generieren.

## 2. Kundin & Marke

| Feld | Wert |
|---|---|
| Name | Ayşenur Yılmazkan |
| Marke | yilmazkan – Interior Design |
| Beruf | Freiberufliche Innenarchitektin (İç Mimar) |
| Standorte | Lefkoşa / KKTC (Nordzypern) · Bornova / İzmir – im Fließtext „Kıbrıs ve İzmir“ (ihr Wunsch). Service für **Türkei + KKTC + Ausland/internationale Kund:innen** (vor Ort oder online) |
| Telefon / WhatsApp | 0548 829 95 49 → international `+90 548 829 95 49` → `https://wa.me/905488299549` (**bestätigt**) |
| E-Mail | a.yilmazkan35@gmail.com |
| Instagram | @designer.ayilmazkan → https://instagram.com/designer.ayilmazkan |
| Ausbildung | Cyprus International University – Interior Architecture; İzmir Kâtip Çelebi Üniversitesi – Dental Asistan (EN: Dental Assistant; von ihr korrigiert, nicht „Diş Teknolojisi“) |
| Software | AutoCAD, SketchUp, 3ds Max, Corona Renderer, Enscape |

**Wichtig:** Im Logo/PDF steht „INTERIOR DESING" – das ist ein Tippfehler. Auf der Website IMMER **„INTERIOR DESIGN"** verwenden.
Das Logo nicht als Bild mit Tippfehler einbinden – entweder korrigierte Logodatei verwenden oder den Untertitel per HTML/CSS setzen.

## 3. Zielgruppe & Ziel

- Privatpersonen in **ganz Türkei, KKTC und im Ausland**, die eine Wohnung einrichten/umgestalten (1+0, 1+1, 2+1 …). Online-Pakete (Beratung, 2D-Plan, 3D-Design) funktionieren ortsunabhängig → das klar kommunizieren. **Nie so formulieren, als arbeite sie nur für die Türkei** – v. a. die EN-Version richtet sich auch an internationale Kund:innen (Kundinnen-Feedback 29.10.2026)
- Kleine Gewerbe: Restaurants, Kliniken, Praxen, Bauträger (Fassade, Grundriss-Visualisierung)
- **Primäre Conversion:** WhatsApp-Chat öffnen. Sekundär: Instagram, E-Mail. **Kein Kontaktformular** (bewusste Entscheidung).
- Jede Sektion endet in einem klaren CTA zu WhatsApp.

## 4. Tech-Stack (fest)

- **Astro** (statisch, schnell, eingebautes i18n-Routing) + **Tailwind CSS**
- Kein Backend, keine Datenbank. Inhalte in `src/content/` bzw. `src/i18n/*.json`
- Bilder über `astro:assets` (`<Image />` / `<Picture />`) → automatisch AVIF/WebP, responsive, lazy
- Deployment: Vercel oder Netlify (statischer Build), eigene Domain
- Keine schweren Libraries. Animationen nur per CSS / kleinem Vanilla-JS (IntersectionObserver)
- Lightbox für die Galerie: leichtgewichtig (z. B. eigene Lösung oder `photoswipe`), keine jQuery

## 5. Sprachen & Routing

- Standardsprache: **Türkisch** unter `/`
- Englisch unter `/en/`
- Sprachumschalter (TR | EN) oben rechts, bleibt auf der gleichen Seite/Sektion
- `<html lang="tr">` bzw. `lang="en"`, `hreflang`-Tags gegenseitig, `x-default` → TR
- Alle UI-Texte in `src/i18n/tr.json` und `src/i18n/en.json` – **keine hartcodierten Texte in Komponenten**
- Türkische Sonderzeichen (ç, ğ, ı, İ, ö, ş, ü) korrekt; Schriftart muss sie unterstützen. Bei `text-transform: uppercase` auf TR-Seiten `lang="tr"` setzen, damit „i" → „İ" korrekt wird.

## 6. Design-System (abgeleitet vom Portfolio)

Stil: ruhig, warm, minimalistisch, „Japandi/Warm Minimal" – Seide/Leinen-Textur, Beige, Taupe, Holz.

| Token | Wert | Verwendung |
|---|---|---|
| `--bg` | `#F4F1EC` | Seitenhintergrund (Off-White/Seide) |
| `--surface` | `#EAE5DD` | Karten, Sektionen |
| `--taupe` | `#7A6E68` | Markenband, Akzente (Balken aus dem Logo) |
| `--ink` | `#2B2826` | Text, Logo-Schwarz |
| `--muted` | `#8C847D` | Sekundärtext |
| `--wood` | `#A67C52` | sparsame Akzente, Hover |
| `--whatsapp` | `#25D366` | nur WhatsApp-Button |

- Überschriften-Akzent: Handschrift-/Script-Font ähnlich dem Portfolio (z. B. *Allura*, *Great Vibes* oder *Mrs Saint Delafield* – Google Fonts), **nur** für große Display-Titel, nie für Fließtext
- Fließtext/UI: *Quicksand* oder *Jost* (rund, ähnlich dem PDF), muss türkische Zeichen unterstützen
- Viel Weißraum, große Bilder, dezente Fade-in-Animationen, das taupefarbene horizontale Band aus dem Logo als wiederkehrendes Gestaltungselement
- Mobile first – die meisten Besucher kommen über Instagram auf dem Handy

## 7. Seitenstruktur (One-Pager + Projektdetailseiten)

1. **Header** – Logo, Navigation (Hizmetler / Paketler / Projeler / Hakkımda / İletişim), TR|EN-Switch
2. **Hero** – großes Render (z. B. 1+1-Wohnzimmer), Script-Titel, kurzer Claim, CTA „WhatsApp'tan Yazın"
3. **Hizmetler / Services** – Kacheln: İç Mekan Tasarımı, 3D Görselleştirme, Yerleşim Planı, Ticari Mekan, Dış Cephe, Online Danışmanlık
4. **Render → Gerçek / Render → Reality** – Vorher/Nachher-Slider (Render vs. echtes Foto) – stärkstes Vertrauenselement, steht auf Kundinnenwunsch **über** den Paketen
5. **Paketler / Packages** – Paketkarten mit Leistungen, Hinweisen und Preis (oder „Fiyat için yazın"), jeweils eigener WhatsApp-CTA mit vorausgefülltem Text
6. **Projeler / Projects** – Galerie-Raster mit Filter (Konut / Ticari / Dış Cephe), Klick → Detailseite oder Lightbox
7. **Süreç / Process** – 3–4 Schritte (Görüşme → Konsept → 3D/Plan → Teslim)
8. **Hakkımda / About** – Foto, kurze Vita, Software, Ausbildung (keine Telefonnummern von Referenzen veröffentlichen!)
9. **İletişim / Contact** – WhatsApp, E-Mail, Instagram, Standorte
10. **Footer** – Logo, Links, © Jahr
11. **Floating WhatsApp-Button** – unten rechts, auf allen Seiten, über allem

## 8. WhatsApp-Integration (Regeln)

- Link-Format: `https://wa.me/905488299549?text=<URL-encoded Text>`
- Nummer zentral in `src/config/site.ts` – nirgends sonst hartcodieren
- Vorausgefüllter Text je nach Sprache und Kontext, z. B.:
  - TR allgemein: „Merhaba Ayşenur Hanım, web sitenizden ulaşıyorum. İç mimarlık hizmetleriniz hakkında bilgi almak istiyorum."
  - EN allgemein: „Hello Ayşenur, I found you through your website and would like to know more about your interior design services."
  - Paket-CTA: „Merhaba, **[Paketname]** hakkında bilgi almak istiyorum."
- `target="_blank" rel="noopener"`, `aria-label` in der jeweiligen Sprache
- Floating-Button: 56–60 px, WhatsApp-Grün, offizielles Icon (SVG inline), dezente Puls-Animation, respektiert `prefers-reduced-motion`, verdeckt auf Mobile keine wichtigen Elemente (Abstand zu Cookie-Leiste/Footer)

## 9. Inhalte & Bilder

- Quelle: Es gibt **keine Originaldateien**. Alle Bilder wurden aus dem Portfolio-PDF extrahiert und liegen sortiert in `assets-raw/<slug>/` (aus `assets-raw.zip`). Beim Einbau nach `src/assets/projects/<slug>/` kopieren.
- **Auflösung ist begrenzt (meist 500–1300 px Kantenlänge).** Konsequenzen fürs Layout:
  - Kein vollflächiges Fullscreen-Hero-Bild auf Desktop. Stattdessen **Split-Hero** (Text links, Bild rechts, max. ~700 px breit) oder Bild mit Seiden-Textur-Rahmen
  - Galerie-Kacheln und Lightbox max. in Originalgröße anzeigen, nie hochskalieren (`widths` nicht größer als Originalbreite)
  - Die Seiden-Textur `brand/silk-texture.jpg` als Hintergrund nutzen, wo große Flächen nötig sind
- Projekt-Slugs: `yatak-odasi-bordo`, `salon-ceviz`, `daire-dogal-tonlar`, `resepsiyon-lobi`, `yatak-odasi-ahsap`, `misafir-wc` (hochaufgelöste Renders, Okt. 2026 von ihr nachgeliefert), `1-1-ev-tasarimi-a`, `1-1-ev-tasarimi-b`, `1-0-studyo`, `steakhouse`, `banyo`, `dentaline-klinik`, `lobi`, `plan-gorsellestirme`, `dis-cephe`
- Render↔Foto-Paare für den Vorher/Nachher-Slider: `dentaline-klinik/render|gercek`, `lobi/render|gercek`, `dis-cephe/on-render|on-gercek`, `dis-cephe/aci-render|aci-gercek`
- Porträt: `brand/portrait.jpg` (schwarz-weiß, 386×488 → klein darstellen, z. B. rund 200–240 px). Zusätzlich `brand/portrait-desk.jpg` / `portrait-standing.jpg` – im Hakkımda-Bereich als transparenter Hintergrund (`EdgeArt`)
- Jedes Bild braucht einen sinnvollen `alt`-Text in beiden Sprachen
- Texte für Pakete: **Struktur** darf sich an Vorlagen orientieren, aber **Formulierungen müssen eigene sein** – keine Texte anderer Architekt:innen 1:1 übernehmen
- Alle Projekte im Portfolio sind **von ihr selbst umgesetzt (bestätigt)** – inkl. Dentaline und der Fassade. Render↔Foto-Vergleiche prominent zeigen.

## 10. Qualitätsregeln

- Lighthouse Mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95
- Semantisches HTML, eine `<h1>` pro Seite, Kontrast AA
- SEO: `<title>`, Meta-Description, Open Graph (Bild!), `LocalBusiness`/`ProfessionalService`-Schema.org JSON-LD je Sprache, `sitemap.xml`, `robots.txt`
- Keine Tracking-Cookies ohne Einwilligung. Falls Analytics: datenschutzfreundlich (Plausible/Umami) oder gar keins
- Impressum/Datenschutz-Seite (KVKK-Hinweis für TR) im Footer
- Keine Telefonnummern Dritter (Referenzen) auf der Website

## 11. Arbeitsweise für Claude Code

- Vor größeren Änderungen kurz den Plan nennen, dann umsetzen
- Kleine, nachvollziehbare Commits (`feat:`, `fix:`, `content:`, `style:`)
- Nach jeder Phase aus `BUILD.md`: `npm run build` ausführen und Fehler beheben, dann Checkliste in `BUILD.md` abhaken
- Fehlende Inhalte nie erfinden (Projekte, Kundenstimmen, Orte/Jahre) → Platzhalter `TODO(content): …` setzen und am Ende auflisten. Paketpreise stehen in `BUILD.md` Phase 5 als Vorschlag; Preise sind pro Paket über `showPrice` ein-/ausblendbar
- Texte: TR ist die Hauptsprache; EN ist eine natürliche Übersetzung, kein Wort-für-Wort-Deutsch-/Türkisch-Englisch
