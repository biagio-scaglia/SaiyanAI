# SaiyanAI 🐉 - Dragon Ball Chatbot & Knowledge Base

Un assistente AI locale esperto su Dragon Ball, potenziato da **LangGraph**, **Qdrant** e **Llama-3.2**. Include un frontend moderno in Next.js con personalità multiple (Goku, Vegeta, Gohan, Frieza).

## 🚀 Funzionalità

- **RAG (Retrieval Augmented Generation)**: Risponde a domande basandosi su file markdown locali (Lore, Personaggi, Archi, Trasformazioni, Tecniche).
- **Ricerca Web**: Cerca su DuckDuckGo per notizie recenti o date di uscita.
- **Personalità Multiple**:
  - **Goku**: Allegro, energico, sempre pronto a combattere.
  - **Vegeta**: Orgoglioso, arrogante, principe dei Saiyan.
  - **Gohan**: Intelligente, pacifico, studioso.
  - **Frieza**: Malvagio, calcolatore, imperatore dello spazio.
- **Privacy Locale**: Usa modelli GGUF e database vettoriale locale (Qdrant).
- **Interfaccia Moderna**: Design responsive con animazioni fluide e tema Dragon Ball.

---

## 🛠️ Installazione e Setup

### Prerequisiti

- Python 3.10 o superiore
- Node.js 18+ e npm (per il frontend)
- Un modello GGUF nella cartella `models/` (Default: `models/Llama-3.2-3B-Instruct-Q4_K_M.gguf`)

### 1. Setup Backend (Python)

Installa le dipendenze Python:

```bash
pip install -r requirements.txt
```

### 2. Caricamento Conoscenza

Popola il database vettoriale con la conoscenza di Dragon Ball (file in `knowledge/`):

```bash
python scripts/load_knowledge.py
```

Questo script caricherà tutti i file markdown dalla cartella `knowledge/` nel database vettoriale Qdrant.

### 3. Setup Frontend (Next.js)

Spostati nella cartella frontend e installa i pacchetti:

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Avvio del Progetto

Per far funzionare tutto, devi aprire **due terminali** separati.

### Terminale 1: Backend API

Avvia il server Python. Usa questo comando per evitare problemi di PATH:

```bash
python -m uvicorn app.main:app --reload
```

_Il server partirà su `http://localhost:8000`._

### Terminale 2: Frontend Web

Avvia l'interfaccia grafica:

```bash
cd frontend
npm run dev
```

_L'app si aprirà su `http://localhost:3000`._

---

## 📁 Struttura del Progetto

```
dragon-ball/
├── app/                    # Backend FastAPI + LangGraph
│   ├── graph/              # Grafo LangGraph per il ragionamento
│   └── main.py             # Entry point FastAPI
├── frontend/               # Frontend Next.js
│   ├── src/
│   │   ├── app/            # Pagine Next.js
│   │   ├── components/    # Componenti React
│   │   └── lib/            # Utilities
│   └── public/            # Immagini e asset statici
├── knowledge/              # File Markdown con conoscenza Dragon Ball
│   ├── dragonball.md
│   ├── series_overview.md
│   ├── transformations_extended.md
│   ├── techniques.md
│   ├── movies_specials.md
│   └── games.md
├── models/                 # Modelli LLM locali (GGUF)
├── qdrant_data/           # Database vettoriale Qdrant
├── scripts/               # Script di utilità
│   ├── load_knowledge.py  # Carica conoscenza in Qdrant
│   ├── test_api.py        # Test API backend
│   └── test_chat.py       # Test chat
└── requirements.txt       # Dipendenze Python
```

---

## 🧪 Test e Verifica

### Script di Test Automatico

Puoi verificare se il backend risponde correttamente (Vector Store + Web Search) usando questo script:

```bash
python scripts/test_api.py
```

### Test Chat Interattivo

Per testare la chat direttamente dal terminale:

```bash
python scripts/test_chat.py
```

---

## 🎯 Come Funziona

1. **Ricezione Domanda**: L'utente invia una domanda tramite l'interfaccia web.
2. **Ricerca Vettoriale**: Il sistema cerca nella knowledge base locale (Qdrant) per informazioni rilevanti.
3. **Ricerca Web (Opzionale)**: Se necessario, cerca informazioni aggiornate su DuckDuckGo.
4. **Generazione Risposta**: Llama-3.2 genera una risposta basata sul contesto trovato e sulla personalità selezionata.
5. **Visualizzazione**: La risposta viene mostrata all'utente con animazioni fluide.

---

## 🔧 Configurazione

### Modello LLM

Il modello di default è `Llama-3.2-3B-Instruct-Q4_K_M.gguf`. Puoi cambiarlo modificando il percorso in `app/main.py`.

### Personalità

Le personalità sono definite in `frontend/src/components/CharacterGrid.tsx`. Puoi aggiungere nuovi personaggi modificando l'array `CHARACTERS`.

### Knowledge Base

Aggiungi nuovi file markdown nella cartella `knowledge/` e riesegui `load_knowledge.py` per aggiornare il database.

---

## 📝 Tecnologie Utilizzate

- **Backend**: FastAPI, LangGraph, LangChain, Qdrant, Ollama
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion
- **AI**: Llama-3.2 (GGUF), Embeddings locali
- **Database**: Qdrant (vettoriale)

---

## 👨‍💻 Sviluppatore

**Developed by Biagio Scaglia**

---

## 📄 Licenza

Questo progetto è stato creato a scopo educativo e dimostrativo.

---

## 🐛 Troubleshooting

### Il backend non si avvia
- Verifica che Python 3.10+ sia installato
- Controlla che tutte le dipendenze siano installate: `pip install -r requirements.txt`
- Assicurati che il modello GGUF sia presente in `models/`

### Il frontend non si connette al backend
- Verifica che il backend sia in esecuzione su `http://localhost:8000`
- Controlla la console del browser per errori CORS

### La knowledge base è vuota
- Esegui `python scripts/load_knowledge.py` per popolare il database
- Verifica che i file markdown siano presenti in `knowledge/`

---

## 🚀 Prossimi Sviluppi

- [ ] Supporto per più modelli LLM
- [ ] Aggiunta di più personaggi
- [ ] Modalità dark/light
- [ ] Export conversazioni
- [ ] Integrazione con API esterne per informazioni in tempo reale
