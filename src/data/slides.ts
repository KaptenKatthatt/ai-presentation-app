import type { Slide } from "../types";

export const slides: Slide[] = [
  {
    id: "title",
    section: "Introduktion",
    eyebrow: "FED25 • AI, TypeScript & moderna utvecklingsflöden",
    title: "Från TypeScript-elev till systemarkitekt med AI",
    subtitle:
      "Hur AI kan fungera som lärare, accelerator och arkitektpartner — utan att du tappar kontrollen.",
    duration: "1 min",
    tone: "intro",
    quote:
      "En elev med rätt verktyg kan börja tänka som en arkitekt tidigare än någonsin.",
    speakerNotes:
      "Hej allihopa, jag heter Jonas Olson och jag studerar frontendutveckling. Jag började i höstas och hade mycket att ta igen, eftersom min förra programmeringserfarenhet låg ungefär 20 år tillbaka i tiden. Det som gjorde störst skillnad för mig var AI. I dag vill jag visa hur AI kan ta oss genom tre steg: läraren, acceleratorn och arkitekten.",
  },
  {
    id: "three-steps",
    section: "Introduktion",
    eyebrow: "Dagens karta",
    title: "Tre steg till övermänsklig utveckling",
    duration: "4 min",
    tone: "intro",
    steps: [
      {
        label: "01",
        title: "Läraren",
        text: "AI förklarar syntax, principer och ramverk när du fastnar.",
      },
      {
        label: "02",
        title: "Acceleratorn",
        text: "AI tar boilerplate, refaktoreringar och större ändringar.",
      },
      {
        label: "03",
        title: "Arkitekten",
        text: "Du designar systemet. AI bygger — tyglad av TypeScript och guard rails.",
      },
    ],
    speakerNotes:
      "Jag tror att relationen till AI går igenom tre steg. Först är den en lärare. Sedan blir den en accelerator. Till sist blir den nästan en byggpartner, men då måste vi tänka som arkitekter. Poängen är inte att sluta förstå kod, utan att flytta fokus från varje enskild rad till system, struktur och kontroll.",
  },
  {
    id: "llm-teacher",
    section: "Steg 1",
    eyebrow: "Läraren",
    title: "LLM:er som personlig mentor",
    subtitle:
      "En LLM är tränad på enorma mängder text och kod — och kan bli en handledare som alltid är tillgänglig.",
    duration: "5 min",
    tone: "teacher",
    bullets: [
      "Förklara HTML, JavaScript, TypeScript och React i lagom nivå.",
      "Be om exempel, motexempel och analogier när koncept inte fastnar.",
      "Använd AI som samtalspartner, inte som facitmaskin.",
      "Claude Code upplevdes särskilt pedagogisk för djupare kodförklaringar.",
    ],
    speakerNotes:
      "En LLM, Large Language Model, är i praktiken en maskin som är tränad på väldigt mycket text och kod. För mig blev det som att ha en personlig handledare dygnet runt. Jag började med ChatGPT, men gick snart också över till Claude Code eftersom jag upplevde den som väldigt pedagogisk på att förklara saker. Det viktiga är att fråga vidare tills man faktiskt förstår.",
  },
  {
    id: "notebooklm",
    section: "Steg 1",
    eyebrow: "Läraren",
    title: "NotebookLM: gör kursmaterialet till din egen lärare",
    duration: "5 min",
    tone: "teacher",
    cards: [
      {
        title: "Källstyrt",
        text: "Du bestämmer vilka dokument, länkar och anteckningar AI:n får använda.",
      },
      {
        title: "Lärformat",
        text: "Generera guider, flashcards, quiz, tankekartor och sammanfattningar.",
      },
      {
        title: "Flera medier",
        text: "Audio och video-overviews kan göra torr dokumentation lättare att ta in.",
      },
    ],
    speakerNotes:
      "NotebookLM är intressant eftersom det inte bara är en allmän chatt. Du skapar en anteckningsbok för ett ämne och matar in de källor som är relevanta. När vi lärde oss React lade jag in dokumentation och länkar. Då kunde jag få guider, tankekartor, flashcards och frågesporter som passade mitt sätt att lära mig.",
  },
  // {
  //   id: 'ide-assistant',
  //   section: 'Steg 1',
  //   eyebrow: 'Första assistenten i editorn',
  //   title: 'Copilot i VS Code: när hjälpen flyttar in i IDE:t',
  //   duration: '3 min',
  //   tone: 'teacher',
  //   bullets: [
  //     'Snabba kodförslag medan du skriver.',
  //     'Bra för TypeScript-interfaces och återkommande React-boilerplate.',
  //     'Mest värdefullt när du redan vet ungefär vad du vill skapa.',
  //     'Bäst som stöd i små steg, inte som ensam arkitekt.',
  //   ],
  //   speakerNotes:
  //     'När man går från chatt till kod blir Copilot i VS Code ofta den första AI-assistenten. Den är snabb och nära koden. Den är bra på interfaces, komponentmallar och repetitiva saker. Men den fungerar bäst när man redan har en riktning. Den ersätter inte förståelse, men den sparar tid.',
  // },
  {
    id: "cursor",
    section: "Steg 2",
    eyebrow: "Acceleratorn",
    title: "Cursor: AI som kan arbeta över flera filer",
    duration: "4 min",
    tone: "accelerator",
    cards: [
      {
        title: "Composer Mode",
        text: "Chatta med AI:n med kontext från flera filer samtidigt.",
      },
      {
        title: "Auto Mode",
        text: "Låt AI:n genomföra större kodändringar och refaktoreringar.",
      },
      {
        title: "Arkitektroll",
        text: "Du beskriver målet, sätter ramarna och granskar resultatet.",
      },
    ],
    speakerNotes:
      "Cursor är ett AI-inbyggt IDE. Skillnaden mot små autocomplete-förslag är att man kan arbeta över flera filer samtidigt. Composer Mode låter dig diskutera kodbasen. Auto Mode kan göra större ändringar. Det gör att man kan lägga mer energi på arkitekturen: vad ska byggas, varför, och vilka regler ska gälla?",
  },
  {
    id: "specialists",
    section: "Steg 2",
    eyebrow: "Specialisterna",
    title: "Claude Code och Codex: olika styrkor i samma verktygslåda",
    duration: "3 min",
    tone: "accelerator",
    bullets: [
      "Claude Code: starkt för stora sammanhang, refaktoreringar och pedagogiska förklaringar.",
      "Codex: starkt för snabb kodproduktion och många parallella uppgifter.",
      "Båda kräver tydliga mål, begränsningar och kontrollpunkter.",
    ],
    speakerNotes:
      "Cursor är snabb och integrerad, men andra verktyg har sina styrkor. Claude Code har varit starkt när jag behövt resonera kring större delar av kodbasen. Codex är mer inriktat på att snabbt genomföra koduppgifter. Men oavsett verktyg behöver man formulera mål och kontrollera resultatet.",
  },
  {
    id: "design-ai",
    section: "Steg 2",
    eyebrow: "AI i designfasen",
    title: "Från textprompt till UI-riktning",
    duration: "3 min",
    tone: "accelerator",
    bullets: [
      "Claude Design och Google Stitch kan hjälpa till med UI-idéer och prototyper.",
      "Du kan lägga mer energi på designbrief och specifikation.",
      "Resultatet blir bäst när du beskriver målgrupp, känsla, innehåll och begränsningar.",
    ],
    speakerNotes:
      "AI hjälper också innan koden. Verktyg som Claude Design och Google Stitch kan generera UI-element och prototyper från text. Men här märker man snabbt att generella instruktioner ger generella resultat. Det är designbriefen som avgör kvaliteten.",
  },
  {
    id: "guardrails",
    section: "Steg 3",
    eyebrow: "Kontrollera AI:n",
    title: "TypeScript är din första guard rail",
    duration: "5 min",
    tone: "guardrails",
    quote: "AI får gärna skriva kod — men TypeScript ska få säga nej.",
    bullets: [
      "Interfaces gör krav på data och komponenter explicita.",
      "Kompilatorn fångar många fel innan appen ens startar.",
      "Type-coverage minskar risken för “any”-läckor och osynliga fel.",
      "Du går från kodskrivare till systemdesigner och kvalitetsgranskare.",
    ],
    speakerNotes:
      "AI kan hallucinera. Den kan hitta på funktioner, missa edge cases eller skapa kod som ser rätt ut men inte håller. Därför är TypeScript så viktigt. Om AI:n genererar kod som inte matchar dina interfaces fångar kompilatorn det. TypeScript blir en kontrollmekanism mellan din avsikt och AI:ns output.",
  },
  {
    id: "validation-tools",
    section: "Steg 3",
    eyebrow: "Verktyg för kontroll",
    title: "När AI-output måste valideras",
    duration: "5 min",
    tone: "guardrails",
    cards: [
      {
        title: "TypeScript",
        text: "Struktur, typer, komponentkontrakt och datasäkerhet.",
      },
      {
        title: "Type coverage",
        text: "Mät hur mycket av kodbasen som faktiskt är typad.",
      },
      {
        title: "Fallow",
        text: "Exempel på verktyg för att validera och styra LLM-output.",
      },
      // {
      //   title: "OpenClaw / Hermes",
      //   text: "Orkestrering för specialiserade assistenter via API:er.",
      // },
    ],
    speakerNotes:
      "När man bygger mer seriösa applikationer behöver man mer än bara bra prompts. Man behöver kontroll. TypeScript är basen. Type-coverage hjälper en att se om typningen faktiskt täcker kodbasen. Verktyg som Fallow kan validera LLM-output. OpenClaw och Hermes är exempel på system för att orkestrera AI-assistenter.",
  },
  {
    id: "harness",
    section: "Vilda västern",
    eyebrow: "Egna agenter",
    title: "Harness: AI:s motsvarighet till Linux",
    duration: "5 min",
    tone: "wildwest",
    bullets: [
      "Hermes: självlärande idé, men inte tillräckligt självgående för större projekt.",
      "OpenClaw: mer proaktivt och bättre på Taskflow/underagenter.",
      "VPS + Telegram gör agenten tillgänglig dygnet runt.",
      "Friheten är stor — men felsökningen, minnet och hallucinationerna följer med.",
    ],
    speakerNotes:
      "Det senaste jag experimenterat med är Hermes och OpenClaw. De är harness, alltså kontrollsystem för AI. Lite som Linux-känslan: väldigt fritt, väldigt justerbart, men också riskabelt. Hermes hade en intressant självlärande idé men var inte självgående nog. OpenClaw var mer kraftfullt med Taskflow och underagenter.",
  },
  {
    id: "memory-problem",
    section: "Vilda västern",
    eyebrow: "Minnet och hallucinationerna",
    title: "Det svåra är inte bara intelligens — det är kontinuitet",
    duration: "5 min",
    tone: "wildwest",
    bullets: [
      "Kontexten fylls snabbt under längre problemlösning.",
      "Dagen efter kan agenten ha tappat tråden i projektet.",
      "Långtidsminne via filer, wikis och skills låter bra i teorin.",
      "I praktiken krävs fortfarande mycket mänsklig struktur och dokumentation.",
    ],
    speakerNotes:
      "Ju mer jag körde OpenClaw, desto tydligare blev problemen. Korttidsminnet, alltså kontexten, fylls efter ett tag. När man kommer tillbaka dagen efter kan den ha glömt viktiga delar. Den teoretiska lösningen är långtidsminne genom filer och wikis, men jag har ännu inte hittat något som är helt pålitligt.",
  },
  {
    id: "cloud-vs-local",
    section: "Vilda västern",
    eyebrow: "Hårdvara & modeller",
    title: "Molnmodeller vinner fortfarande för stora TypeScript/React-projekt",
    duration: "5 min",
    tone: "wildwest",
    bullets: [
      "Ollama Cloud ger många open source-modeller och mer experimentutrymme.",
      "Lokala modeller är roliga, men VRAM blir snabbt flaskhalsen.",
      "För komplex kod krävs ofta stora kontextfönster och starka molnmodeller.",
      "Som nybörjare kan kvantitet ibland vara viktigare än perfekt kvalitet.",
    ],
    speakerNotes:
      "Jag testade OpenClaw med Ollama Cloud för att få tillgång till modeller som Kimi, GLM och Gemma. För mig som experimenterade var kvantitet viktigt. Lokala modeller är spännande, men hårdvaran blir snabbt dyr. För större TypeScript- och React-projekt är molnmodellerna fortfarande mycket starkare.",
  },
  {
    id: "market",
    section: "Slutledning",
    eyebrow: "Marknadsöversikt",
    title: "Vilket verktyg ska man lägga pengar på?",
    duration: "5 min",
    tone: "market",
    cards: [
      {
        title: "Cursor",
        text: "Bäst för maximal acceleration direkt i kodmiljön.",
      },
      {
        title: "Claude Code/Design",
        text: "Robust och pedagogiskt, särskilt för resonemang och designstöd.",
      },
      {
        title: "ChatGPT",
        text: "Stark allroundhjälp för kod, förklaringar, bilder och idéarbete.",
      },
      {
        title: "Ollama Cloud",
        text: "Mest intressant för experiment med många modeller och harness.",
      },
    ],
    speakerNotes:
      "De kommersiella modellerna är populära av en anledning: de är väldigt bra och enkla att använda. Om jag bara skulle välja en för maximal acceleration hade jag tittat på Cursor. För robust och pedagogiskt stöd är Claude Code starkt. ChatGPT är väldigt bra allround, särskilt när man även behöver bild och idéarbete. Ollama Cloud är mer för experiment.",
  },
  {
    id: "best-practice",
    section: "Slutledning",
    eyebrow: "Bästa praxis",
    title: "Förarbete och dokumentation är superkraften",
    duration: "4 min",
    tone: "market",
    quote: "“Gör det snyggt och revolutionerande” är inte en specifikation.",
    bullets: [
      "Beskriv syfte, målgrupp, teknisk stack och begränsningar.",
      "Skriv tydliga krav innan du ber AI:n koda.",
      "Be AI:n arbeta i små steg och visa ändringar.",
      "Dokumentera beslut så framtida AI-sessioner kan hitta tillbaka.",
    ],
    speakerNotes:
      "Den största lärdomen är att lägga tid på förarbete och dokumentation. Ju tydligare instruktioner AI:n får, desto bättre går det. Om man bara skriver gör det snyggt och revolutionerande vet den inte vad det betyder. Man måste skriva vad man vill åstadkomma, varför, och vilka begränsningar som finns.",
  },
  {
    id: "summary",
    section: "Sammanfattning",
    eyebrow: "Från kodskrivare till systemarkitekt",
    title: "Din nya roll: styr, kontrollera och demonstrera",
    duration: "5 min + demo/Q&A",
    tone: "summary",
    steps: [
      {
        label: "01",
        title: "Använd läraren",
        text: "Förstå koncept med Claude Code, ChatGPT och NotebookLM.",
      },
      {
        label: "02",
        title: "Använd acceleratorn",
        text: "Implementera snabbt med Cursor, Copilot och agentflöden.",
      },
      {
        label: "03",
        title: "Sätt guard rails",
        text: "Låt TypeScript, typning och dokumentation hålla AI:n på banan.",
      },
    ],
    speakerNotes:
      "Sammanfattningsvis: vi går från att bara skriva kod till att designa system. Använd AI som lärare för att förstå. Använd den som accelerator för att bygga snabbare. Men sätt guard rails med TypeScript, dokumentation och validering. Nu går jag över till att visa ett eller två egna projekt som jag byggt med AI.",
  },
  {
    id: "demo",
    section: "Demo",
    eyebrow: "Projekt showcase",
    title: "Live Demo",
    duration: "Demo + Q&A",
    tone: "demo",
    cards: [
      {
        title: "HelioTrip",
        text: "Utbildning och äventyr i rymden, i 3D!",
        image: "/images/heliotrip.png",
        href: "https://project-helio-trip.vercel.app/",
      },
      {
        title: "Doom",
        text: "Första projektet med OpenClaw",
        image: "/images/doom.png",
        imagePosition: "top center",
        href: "https://testapp-doom.vercel.app/",
      },
    ],
    speakerNotes:
      "Här kan du byta till live-demo. Välj hellre ett fåtal tydliga projekt än att visa allt. För varje projekt: börja med problemet, visa hur du styrde AI:n, visa resultatet och avsluta med vad du lärde dig. Därefter öppnar du för frågor.",
  },
  {
    id: "questions",
    section: "End",
    eyebrow: "Projekt showcase",
    title: "Frågor?",
    duration: "Demo + Q&A",
    tone: "demo",
    cards: [
      {
        title: "www.JonasOlson.se",
        text: "https://github.com/kaptenKatthatt/",
        href: "https://www.jonasolson.se/",
        textHref: "https://github.com/kaptenKatthatt/",
      },
    ],
    speakerNotes: "Slut!",
  },
];
