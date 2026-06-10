# Från TypeScript-elev till systemarkitekt med AI

En modern presentationsapp byggd i React + TypeScript + Vite utifrån manuset till föreläsningen *Från TypeScript-elev till systemarkitekt med AI*.

**Live:** [ai-presentation-app-ten.vercel.app](https://ai-presentation-app-ten.vercel.app/)

## Funktioner

### Presentation

- Tangentbordsnavigering med piltangenter och mellanslag
- Fullskärmsläge med `F`
- Presenterläge med `M` — timer, talarmanus och förhandsvisning av föregående/nästa slide
- Slideöversikt med `O`
- Separat presentationsfönster med `P` (synkas via BroadcastChannel)
- Progressbar och responsiv layout som skalar till skärmstorlek

### Slideövergångar

Keynote-inspirerade övergångar per slide, med förbättrad prestanda och smidigare animationer:

- Upplösning, skjut, glid, zoom
- Tonar genom svart, vänd, kub, dörröppning, mosaik
- Förhandsvisning av övergång direkt i editorn

### Slideeditor

- Redigeringsläge med `E`
- Dra-och-släpp för att ändra slideordning
- Inspector för titel, innehåll, layout och övergång
- Lägg till nya slides från mallar
- Återställ enskilda slides eller hela presentationen till originalinnehållet
- Ändringar sparas lokalt i webbläsaren (localStorage)

### Kvalitet

- 100 % type coverage (type-coverage)
- ESLint + strikt TypeScript 6
- Allt slideinnehåll typat i `src/data/slides.ts`

## Kortkommandon

| Tangent | Åtgärd |
|---------|--------|
| `→` / `Mellanslag` | Nästa slide |
| `←` | Föregående slide |
| `F` | Fullskärm |
| `M` | Presenterläge |
| `O` | Slideöversikt |
| `E` | Redigeringsläge |
| `P` | Öppna presentationsfönster |

## Kom igång

```bash
npm install
npm run dev
```

Öppna sedan adressen som Vite visar i terminalen, oftast `http://localhost:5173`.

## Bygg och kontrollera

```bash
npm run build      # Produktionsbygge
npm run preview    # Förhandsgranska bygget lokalt
npm run check      # Typecheck, lint och type coverage
```

Appen deployas automatiskt till [Vercel](https://ai-presentation-app-ten.vercel.app/) vid push till `main`.

## Redigera innehållet

Ändra slides i:

```txt
src/data/slides.ts
```

Varje slide följer interfacet i:

```txt
src/types.ts
```

Det gör att TypeScript hjälper dig att hålla ordning på innehållet. I redigeringsläget (`E`) kan du också ändra slides direkt i appen — ändringarna sparas i webbläsarens localStorage och överlever omladdning.

## Teknikstack

- **React** — UI och komponentstruktur
- **TypeScript 6** — typsäkerhet i hela kodbasen
- **Vite** — snabb utveckling och bygge
- **lucide-react** — ikoner

## Senaste utvecklingen

- Förbättrade slideövergångar med optimerad rendering och `FitToScreen`-logik
- Slideeditor med Keynote-liknande övergångar och lokal persistens
- Presenterläge med redigerbara talarmanus och timer
- Vercel-deploy med TypeScript 6-kompatibilitet
- ESLint, strikt type checking och 100 % type coverage
