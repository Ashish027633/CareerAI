from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    AI_SERVICE_HOST: str = "127.0.0.1"
    AI_SERVICE_PORT: int = 8000
    SPRING_BOOT_URL: str = "http://localhost:8080"
    API_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()
