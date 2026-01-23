import os
from typing import TypedDict, Literal, List
from langchain_community.chat_models import ChatLlamaCpp
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.tools import DuckDuckGoSearchRun
from qdrant_client import QdrantClient
from langgraph.graph import StateGraph, END

# --- Config ---
MODEL_PATH = "models/Llama-3.2-3B-Instruct-Q4_K_M.gguf"
QDRANT_PATH = "./qdrant_data"
COLLECTION_NAME = "dragonball_knowledge"
SIMILARITY_THRESHOLD = 0.30  # Adjusted based on observed score range

# --- Init Components ---
print("Initializing components...")

# Embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Vector Store
client = QdrantClient(path=QDRANT_PATH)
vector_store = QdrantVectorStore(
    client=client, collection_name=COLLECTION_NAME, embedding=embeddings
)

# LLM - Optimized for Speed and Precision (Low Temperature)
llm = ChatLlamaCpp(
    model_path=MODEL_PATH,
    temperature=0.1,  # Lowered strictly for RAG accuracy
    n_ctx=2048,
    n_gpu_layers=-1,
    n_batch=512,
    verbose=False,
)

# Search
search_tool = DuckDuckGoSearchRun()


# --- State ---
class AgentState(TypedDict):
    question: str
    context: str
    source: str  # "retriever" or "web"
    answer: str
    persona: str = "default"  # New field


# --- Nodes ---


def router_node(state: AgentState):
    """
    Decides whether to route to Vector Store or Web Search.
    Improved with better heuristics and keyword detection.
    """
    print(f"Routing query: {state['question']}")
    question_lower = state["question"].lower()

    # Keywords that strongly indicate web search needed
    web_keywords = [
        "release date",
        "when did",
        "when will",
        "coming out",
        "announced",
        "merchandise",
        "buy",
        "price",
        "where to",
        "news",
        "latest",
        "recent",
        "update",
        "trailer",
        "episode count",
        "season",
        "2024",
        "2025",
        "next year",
        "this year",
    ]

    # Keywords that indicate knowledge base is sufficient
    vector_keywords = [
        "who is",
        "what is",
        "explain",
        "tell me about",
        "character",
        "transformation",
        "form",
        "technique",
        "power",
        "ability",
        "story",
        "arc",
        "saga",
        "fight",
        "battle",
        "lore",
        "history",
    ]

    # Check for web keywords first (higher priority)
    if any(keyword in question_lower for keyword in web_keywords):
        print("Routing to WEB (keyword match)")
        return "web_search"

    # Check for vector keywords
    if any(keyword in question_lower for keyword in vector_keywords):
        print("Routing to VECTOR (keyword match)")
        return "retrieve"

    # Use LLM for ambiguous cases
    # Use LLM for ambiguous cases
    prompt = PromptTemplate.from_template(
        """You are a strict classifier.

Decide where to route the user question.

VECTOR:
- In-universe Dragon Ball knowledge
- Characters, transformations, techniques
- Story, lore, events inside the anime/manga
- Relationships between characters

WEB:
- Real-world information
- Release dates, news, announcements
- Merchandise, games, products
- Voice actors, creators, production details

Rules:
- If the question refers to the Dragon Ball universe itself, choose VECTOR
- If the question refers to the real world, choose WEB
- If uncertain, choose VECTOR

Question: {question}

Answer with only one word: VECTOR or WEB"""
    )
    chain = prompt | llm | StrOutputParser()
    decision = chain.invoke({"question": state["question"]}).strip().upper()

    # Fallback heuristic
    if "WEB" in decision:
        print(f"Routing to WEB (LLM decision: {decision})")
        return "web_search"
    print(f"Routing to VECTOR (LLM decision: {decision})")
    return "retrieve"


def retrieve_node(state: AgentState):
    print("Retrieving from Vector DB...")
    # Strict matching: Get scores and filter
    # Reduced k=3 as per 'Hard Mode' instructions (less context = less hallucination)
    results = vector_store.similarity_search_with_score(state["question"], k=3)

    valid_docs = []
    for doc, score in results:
        print(
            f"  - Found doc with score: {score:.4f} | Content: {doc.page_content[:60]}..."
        )
        if score >= SIMILARITY_THRESHOLD:
            valid_docs.append(doc)

    if not valid_docs:
        print("  ! No documents met the similarity threshold.")
        return {"context": "", "source": "retriever"}

    # Format context with source information
    context_parts = []
    for i, doc in enumerate(valid_docs, 1):
        context_parts.append(f"[Source {i}]\n{doc.page_content}")

    context = "\n\n---\n\n".join(context_parts)
    print(f"Retrieved {len(valid_docs)} valid documents")
    return {"context": context, "source": "retriever"}


def web_search_node(state: AgentState):
    print("Searching Web...")
    results = search_tool.invoke(state["question"])
    return {"context": results, "source": "web"}


def generate_node(state: AgentState):
    print(f"Generating Answer with Persona: {state.get('persona', 'default')}...")

    persona = state.get("persona", "default").lower()
    context = state.get("context", "")

    # HANDLE EMPTY CONTEXT EARLY
    if not context and state.get("source") == "retriever":
        return {
            "answer": "I apologize, but I don't have enough specific information in my database to answer that accurately. I prefer not to guess. Would you like me to try browsing the web for this?"
        }

    # Define Persona Prompts - Kept strict but character-aligned
    prompts = {
        "goku": """You are Son Goku.
        - Tone: Energetic, simple, battle-focused.
        - Rules: Answer ONLY using the provided context. If you don't know, admit it cheerfully: "Haha, I'm not sure about that one!\"""",
        "vegeta": """You are Vegeta, Prince of Saiyans.
        - Tone: Arrogant, concise, dismissive.
        - Rules: Answer ONLY using the provided context. Do not invent trivialities. If unknown, say: "Hmph. That is not worth my attention." or "I do not know." """,
        "gohan": """You are Son Gohan.
        - Tone: Polite, scholarly, explanatory.
        - Rules: Answer ONLY using the provided context. Be precise. If unknown, say: "I haven't studied that part yet, sorry.\" """,
        "frieza": """You are Frieza.
        - Tone: Menacingly polite, superiors.
        - Rules: Answer ONLY using the provided context. If unknown, say: "My limit for interruptions has been reached. I do not know.\" """,
        "default": """You are a Strict Dragon Ball Knowledge Base.
        - Tone: Objective, factual.
        - Rules: Answer ONLY using the provided context.""",
    }

    selected_persona_prompt = prompts.get(persona, prompts["default"])

    # SUPER STRICT SYSTEM PROMPT
    # --- PROMPT SELECTION ---
    source = state.get("source", "retriever")

    if source == "web":
        # WEB SEARCH MODE: Lenient summarization but STRICT RELEVANCE
        system_prompt = f"""{selected_persona_prompt}
        
        SEARCH RESULTS:
        {context}
        
        INSTRUCTIONS:
        1. **Relevance Check**: Ignore any search results that are NOT related to Dragon Ball, Anime, Manga, or Games.
        2. **Summarize**: Use ONLY the relevant Dragon Ball search results to answer the question.
        3. **Gaps**: If the search results are about math (e.g. Laplace transforms), science, or unrelated topics, IGNORE THEM.
        4. **Fallback**: If no relevant Dragon Ball info is found in the results, say "I couldn't find any clear Dragon Ball information about that."
        5. **Persona**: Maintain your character's voice.
        
        Question: {state["question"]}
        """
    else:
        # STRICT RAG MODE (Knowledge Base): Zero Tolerance
        system_prompt = f"""{selected_persona_prompt}
        
        CONTEXT DATA:
        {context}
        
        OFFICIAL INSTRUCTIONS:
        1. **NO OUTSIDE KNOWLEDGE**: You are FORBIDDEN from using your pre-trained knowledge. Use ONLY the 'CONTEXT DATA' provided above.
        2. **STRICT FALLBACK**: If the answer is not explicitly written in the CONTEXT DATA, you MUST respond with a variation of "I don't have that information." Do not guess. Do not halllucinate.
        3. **QUOTES**: When possible, base your answer on specific phrases from the text.
        4. **PERSONA**: Keep your persona, but do not let it excuse hallucinations. Accuracy is the highest law.
        
        Question: {state["question"]}
        """

    prompt = PromptTemplate.from_template(system_prompt + "\nAnswer:")

    # Using the low-temp LLM
    chain = prompt | llm | StrOutputParser()

    response = chain.invoke({})
    return {"answer": response}


def check_retrieval(state: AgentState):
    """
    Checks if retrieval found relevant documents.
    If not (empty context), routes to Web Search.
    """
    context = state.get("context", "")
    if not context or len(context.strip()) < 10:
        print("  ! Retrieval empty or irrelevant -> Fallback to WEB SEARCH")
        return "web_search"
    return "generate"


# --- Graph ---
workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("retrieve", retrieve_node)
workflow.add_node("web_search", web_search_node)
workflow.add_node("generate", generate_node)

# Set Entry Point (Router Logic is conditional edge)
workflow.set_conditional_entry_point(
    router_node, {"retrieve": "retrieve", "web_search": "web_search"}
)

# Edges
# If retrieve fails (no docs > threshold), fall back to web search
workflow.add_conditional_edges(
    "retrieve", check_retrieval, {"web_search": "web_search", "generate": "generate"}
)
workflow.add_edge("web_search", "generate")
workflow.add_edge("generate", END)

# Compile
app = workflow.compile()

if __name__ == "__main__":
    # Test run
    res = app.invoke({"question": "Who is Goku?"})
    print("\n--- Result ---\n", res["answer"])
