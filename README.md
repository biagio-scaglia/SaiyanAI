# SaiyanAI 🐉 - Dragon Ball Chatbot & Knowledge Base

Un assistente AI locale esperto su Dragon Ball, potenziato da **LangGraph**, **Qdrant** e **Llama-3.2**. Include un frontend moderno in Next.js con personalità multiple (Goku, Vegeta, Gohan, Frieza).

## 🚀 Funzionalità - "Hard Mode" RAG Edition 🔥

Questo progetto implementa una pipeline RAG di livello industriale ("SaaS-grade") ottimizzata per modelli piccoli come **Llama 3B**.

- **RAG "Strict" (Anti-Allucinazione)**:
  - **Threshold di Similarità**: Se il contesto recuperato ha un punteggio basso (< 0.30), l'AI si rifiuta di rispondere (fallback "Non lo so").
  - **Chunking Semantico**: Usiamo `MarkdownHeaderTextSplitter` per rispettare la struttura (Header #, ##, ###).
  - **Retrieval Mirato**: Recuperiamo solo i top-3 chunk più rilevanti (`k=3`).
- **Router Intelligente "Classifier"**: Router deterministico Vector DB vs Web.
- **Prompt Autoritari**: Il sistema vieta esplicitamente l'uso di conoscenza pregressa non presente nel contesto.
- **Ricerca Web**: DuckDuckGo per notizie recenti.
- **Personalità Multiple**: Goku, Vegeta, Gohan, Frieza.
- **Privacy Locale**: 100% Offline Capable (GGUF + Qdrant).
- **Interfaccia Moderna**: Next.js + Tailwind + Framer Motion.

---

## 🛠️ Installazione e Setup

### Prerequisiti

- Python 3.10+
- Node.js 18+
- Un modello GGUF in `models/` (Default: `models/Llama-3.2-3B-Instruct-Q4_K_M.gguf`)

### 1. Setup Backend (Python)

```bash
pip install -r requirements.txt
```

### 2. Caricamento Conoscenza (Semantic Chunking)

Popola il database vettoriale sfruttando il nuovo chunking semantico:

```bash
python scripts/load_knowledge.py
```

### 3. Setup Frontend (Next.js)

```bash
cd frontend
npm install
cd ..
```

---

## ▶️ Avvio del Progetto

### Terminale 1: Backend API

```bash
python -m uvicorn app.main:app --reload
```

_(Server su `http://localhost:8000`)_

### Terminale 2: Frontend Web

```bash
cd frontend
npm run dev
```

_(App su `http://localhost:3000`)_

---

## 📁 Struttura del Progetto

```
dragon-ball/
├── app/                    # Backend FastAPI + LangGraph
│   ├── graph/             # RAG Pipeline (Router -> Retrieve -> Generate)
│   └── main.py            # Entry point FastAPI
├── frontend/               # Frontend Next.js
├── knowledge/              # File Markdown (Lore, Personaggi, Archi)
├── models/                 # Modelli LLM locali (GGUF)
├── qdrant_data/           # Database vettoriale Qdrant
├── scripts/               # Script di utilità
│   ├── load_knowledge.py  # Ingestion con chunking semantico
│   ├── verify_hard_mode.py # Test anti-allucinazione
│   └── test_chat.py       # Test chat console
└── requirements.txt       # Dipendenze Python
```

---

## 🧪 Test e Verifica

### Verifica "Hard Mode"

Esegui questo script per vedere il RAG rifiutare domande fuori contesto:

```bash
python scripts/verify_hard_mode.py
```

### Test Chat

```bash
python scripts/test_chat.py
```

---

## 📝 Tecnologie

- **Backend**: FastAPI, LangGraph, LangChain
- **RAG**: Qdrant, HuggingFace Embeddings (`all-MiniLM-L6-v2`)
- **Frontend**: Next.js 15, React, TypeScript, Tailwind, Framer Motion
- **AI**: Llama-3.2 3B via `llama-cpp-python`

---

## 👨‍💻 Sviluppatore

**Developed by Biagio Scaglia**

---

## 📄 Licenza

Questo progetto è stato creato a scopo educativo e dimostrativo.
