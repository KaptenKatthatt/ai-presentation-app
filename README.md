# Från TypeScript-elev till systemarkitekt med AI

En modern presentationsapp byggd i React + TypeScript + Vite utifrån manuset.

## Funktioner

- Tangentbordsnavigering med piltangenter och mellanslag
- Fullskärmsläge med `F`
- Manus-/presenterläge med `M`
- Slideöversikt med `O`
- Progressbar
- Responsiv layout
- Allt slideinnehåll ligger typat i `src/data/slides.ts`

## Kom igång

```bash
npm install
npm run dev
```

Öppna sedan adressen som Vite visar i terminalen, oftast `http://localhost:5173`.

## Bygg för publicering

```bash
npm run build
npm run preview
```

## Redigera innehållet

Ändra slides i:

```txt
src/data/slides.ts
```

Varje slide följer interfacet i:

```txt
src/types.ts
```

Det gör att TypeScript hjälper dig att hålla ordning på innehållet.
