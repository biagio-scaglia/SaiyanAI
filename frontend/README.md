# SaiyanAI Frontend 🐉

Frontend moderno per SaiyanAI - Assistente AI Dragon Ball, costruito con Next.js 15, React, TypeScript e Tailwind CSS.

## 🚀 Tecnologie

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipizzazione statica
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animazioni fluide
- **Lucide React** - Icone moderne

## 📁 Struttura

```
frontend/
├── src/
│   ├── app/                    # Pagine e layout Next.js
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx          # Layout principale
│   │   ├── globals.css         # Stili globali
│   │   └── character/[slug]/   # Pagine personaggi dinamiche
│   ├── components/             # Componenti React riutilizzabili
│   │   ├── Navbar.tsx          # Barra di navigazione
│   │   ├── Hero.tsx            # Sezione hero
│   │   ├── CharacterGrid.tsx   # Griglia personaggi
│   │   └── ChatSection.tsx     # Componente chat
│   └── lib/                    # Utilities
│       └── utils.ts            # Funzioni helper
└── public/                     # Asset statici
    ├── background.jpg          # Sfondo principale
    ├── background-chat.jpg     # Sfondo chat
    └── *.webp                  # Immagini personaggi
```

## 🛠️ Setup

### Installazione Dipendenze

```bash
npm install
```

### Avvio Sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su [http://localhost:3000](http://localhost:3000)

### Build Produzione

```bash
npm run build
npm start
```

## 🎨 Componenti Principali

### Navbar
Barra di navigazione fissa in alto con logo SaiyanAI e link di navigazione.

### Hero
Sezione hero con animazioni e call-to-action.

### CharacterGrid
Griglia di personaggi selezionabili (Goku, Vegeta, Gohan, Frieza) con card animate.

### ChatSection
Componente chat completo con:
- Header con logo Oracle System
- Area messaggi scrollabile
- Input con validazione
- Animazioni per nuovi messaggi
- Supporto per personalità multiple

## 🔌 API Backend

Il frontend si connette al backend FastAPI su `http://localhost:8000/chat`.

Endpoint utilizzato:
- `POST /chat` - Invia messaggio e riceve risposta AI

## 🎯 Personalità Personaggi

Ogni personaggio ha una personalità unica definita nel backend:
- **Goku**: Allegro e energico
- **Vegeta**: Orgoglioso e arrogante
- **Gohan**: Intelligente e pacifico
- **Frieza**: Malvagio e calcolatore

## 🎨 Styling

Il tema è basato sui colori di Dragon Ball:
- **Arancione** (`#ea580c`) - Colore principale, energia
- **Nero** - Sfondo principale
- **Grigio scuro** - Elementi UI
- **Bianco** - Testo principale

## 📱 Responsive Design

L'interfaccia è completamente responsive e ottimizzata per:
- Desktop (1920px+)
- Tablet (768px - 1919px)
- Mobile (320px - 767px)

## 🚀 Deploy

### Vercel (Consigliato)

```bash
npm install -g vercel
vercel
```

### Altri Provider

Dopo il build, la cartella `.next` contiene l'applicazione pronta per il deploy.

## 👨‍💻 Sviluppatore

**Developed by Biagio Scaglia**

---

Per maggiori informazioni sul progetto completo, consulta il [README principale](../README.md).
