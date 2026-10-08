from fastapi import APIRouter

router = APIRouter()

@router.get("/health", tags=["Health"])
@router.get("/api/v1/health", tags=["Health"])
async def health_check():
    return {
        "status": "UP",
        "service": "careerai-ai-service",
        "version": "0.1.0"
    }
