from pydantic import BaseModel
from typing import Optional, Any

class ErrorResponse(BaseModel):
    success: bool = False
    error: str
    message: str
    details: Optional[Any] = None
