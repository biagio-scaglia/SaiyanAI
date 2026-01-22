from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.graph.graph import app as graph_app

app = FastAPI(title="Dragon Ball Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    persona: str = "default"


@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        # Invoke the graph
        result = graph_app.invoke(
            {"question": request.message, "persona": request.persona}
        )
        return {"response": result["answer"], "source": result.get("source", "unknown")}
    except Exception as e:
        print(f"Error processing request: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
