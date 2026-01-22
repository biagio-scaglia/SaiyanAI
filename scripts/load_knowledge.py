import os
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
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
    # Load documents
    loader = DirectoryLoader(
        KNOWLEDGE_DIR,
        glob="**/*.md",
        loader_cls=TextLoader,
        loader_kwargs={"encoding": "utf-8"},
    )
    documents = loader.load()
    print(f"Loaded {len(documents)} documents.")

    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        separators=["\n## ", "\n### ", "\n", " ", ""],
    )
    splits = text_splitter.split_documents(documents)
    print(f"Split into {len(splits)} chunks.")

    # Initialize Embeddings
    print("Initializing embeddings (all-MiniLM-L6-v2)...")
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    # Initialize Qdrant
    print(f"Indexing into Qdrant collection '{COLLECTION_NAME}'...")

    # Check if we can connect or create local
    if not os.path.exists(QDRANT_PATH):
        os.makedirs(QDRANT_PATH)

    qdrant_client = QdrantClient(path=QDRANT_PATH)

    # Create collection if not exists (not strictly necessary with from_documents but good practice)
    if not qdrant_client.collection_exists(COLLECTION_NAME):
        qdrant_client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=models.VectorParams(
                size=384,  # all-MiniLM-L6-v2 dimension
                distance=models.Distance.COSINE,
            ),
        )

    # Ingest
    # Ingest
    print("Ingesting documents...")
    vector_store = QdrantVectorStore(
        client=qdrant_client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings,
    )
    vector_store.add_documents(documents=splits)

    print("Ingestion complete!")


if __name__ == "__main__":
    ingest_data()
