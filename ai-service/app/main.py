from fastapi import FastAPI
from fastapi import Depends
from app.routes import health, analysis, match
from app.auth import verify_api_key

app = FastAPI(
    title="CareerAI AI Service",
    description="AI service for CareerAI resume intelligence pipeline.",
    version="1.0.0"
)

app.include_router(health.router)
app.include_router(analysis.router, dependencies=[Depends(verify_api_key)])
app.include_router(match.router, dependencies=[Depends(verify_api_key)])

@app.get("/", tags=["Root"])
async def root():
    return {
        "service": "CareerAI AI Service",
        "status": "running"
    }
