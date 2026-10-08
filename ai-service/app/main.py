from fastapi import FastAPI
from app.routes import health, analysis, match

app = FastAPI(
    title="CareerAI AI Service",
    description="AI service for CareerAI resume intelligence pipeline.",
    version="1.0.0"
)

app.include_router(health.router)
app.include_router(analysis.router)
app.include_router(match.router)

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "CareerAI AI Service",
        "status": "running"
    }
