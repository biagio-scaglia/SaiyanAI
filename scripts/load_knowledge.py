import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import (
    RecursiveCharacterTextSplitter,
    MarkdownHeaderTextSplitter,
)
from langchain_qdrant import QdrantVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.http import models

# Configuration
KNOWLEDGE_DIR = "./knowledge"
COLLECTION_NAME = "dragonball_knowledge"
QDRANT_PATH = "./qdrant_data"  # Local Qdrant storage


def ingest_data():
    print(f"Loading data from {KNOWLEDGE_DIR}...")

    # 1. Load Raw Content
    # We load as text first to pass to MarkdownHeaderTextSplitter
    documents = []
    for root, dirs, files in os.walk(KNOWLEDGE_DIR):
        for file in files:
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                    documents.append({"content": content, "source": file})

    print(f"Loaded {len(documents)} source files.")

    # 2. Semantic Split by Headers (Level 1)
    # This ensures chunks respect the document structure
    print("Splitting by Headers...")
    headers_to_split_on = [
        ("#", "Header 1"),
        ("##", "Header 2"),
        ("###", "Header 3"),
    ]
    markdown_splitter = MarkdownHeaderTextSplitter(
        headers_to_split_on=headers_to_split_on
    )

    md_header_splits = []
    for doc in documents:
        splits = markdown_splitter.split_text(doc["content"])
        for split in splits:
            # Preserve source metadata
            split.metadata["source"] = doc["source"]
            md_header_splits.append(split)

    print(f"Created {len(md_header_splits)} semantic sections from headers.")

    # 3. Recursive Split (Level 2)
    # Ensure no chunk is too large (target ~400-500 tokens for embedding model context)
    # all-MiniLM-L6-v2 has max 512 tokens. Safe char limit ~1000-1500.
    # User requested: "300-500 token" chunks.
    print("Splitting large sections...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=150,
        separators=["\n\n", "\n", " ", ""],
    )
    final_splits = text_splitter.split_documents(md_header_splits)
    print(f"Final count: {len(final_splits)} chunks ready for ingestion.")

    # Initialize Embeddings
    print("Initializing embeddings (all-MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # Initialize Qdrant
    print(f"Indexing into Qdrant collection '{COLLECTION_NAME}'...")

    if not os.path.exists(QDRANT_PATH):
        os.makedirs(QDRANT_PATH)

    qdrant_client = QdrantClient(path=QDRANT_PATH)

    # Recreate collection to clear old chunks (Important for clean slate!)
    if qdrant_client.collection_exists(COLLECTION_NAME):
        print("Recreating collection to apply new chunking strategy...")
        qdrant_client.delete_collection(COLLECTION_NAME)

    qdrant_client.create_collection(
        collection_name=COLLECTION_NAME,
        vectors_config=models.VectorParams(
            size=384,  # all-MiniLM-L6-v2 dimension
            distance=models.Distance.COSINE,
        ),
    )

    # Ingest
    print("Ingesting documents...")
    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings,
    )
    vector_store.add_documents(documents=final_splits)

    print("Ingestion complete! Hard Mode Enabled. 🔥")


if __name__ == "__main__":
    ingest_data()
