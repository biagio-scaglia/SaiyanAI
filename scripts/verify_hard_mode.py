import sys
import os

# Add project root to path
sys.path.append(os.getcwd())

from app.graph.graph import app, SIMILARITY_THRESHOLD


def verify_hard_mode():
    print(
        f"--- RUNNING HARD MODE VERIFICATION (Threshold: {SIMILARITY_THRESHOLD}) ---\n"
    )

    tests = [
        ("What is the Kamehameha?", "KNOWN FACT (Should retrieve)"),
        ("Who is Naruto Uzumaki?", "UNKNOWN/IRRELEVANT (Should fallback)"),
        ("What is the capital of France?", "UNKNOWN (Should fallback)"),
    ]

    for question, desc in tests:
        print(f"\n[{desc}] Question: {question}")
        try:
            res = app.invoke({"question": question})
            print(f"Source: {res.get('source')}")
            print(f"Answer: {res['answer']}")
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    verify_hard_mode()
