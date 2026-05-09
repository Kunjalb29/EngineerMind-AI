from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "EngineerMind AI"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    API_PREFIX: str = "/api/v1"

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:password@localhost:5432/engineermind"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # Auth (Clerk)
    CLERK_SECRET_KEY: Optional[str] = None
    CLERK_PUBLISHABLE_KEY: Optional[str] = None
    JWT_SECRET: str = "engineermind-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"

    # GitHub
    GITHUB_CLIENT_ID: Optional[str] = None
    GITHUB_CLIENT_SECRET: Optional[str] = None
    GITHUB_TOKEN: Optional[str] = None

    # OpenAI
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o"
    
    # Anthropic
    ANTHROPIC_API_KEY: Optional[str] = None

    # Qdrant
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: Optional[str] = None
    QDRANT_COLLECTION: str = "engineermind_knowledge"

    # AWS S3
    AWS_ACCESS_KEY_ID: Optional[str] = None
    AWS_SECRET_ACCESS_KEY: Optional[str] = None
    AWS_REGION: str = "us-east-1"
    S3_BUCKET: str = "engineermind-ai"

    # ML Models
    CODEBERT_MODEL: str = "microsoft/codebert-base"
    BGE_MODEL: str = "BAAI/bge-large-en-v1.5"
    WHISPER_MODEL: str = "base"
    T5_MODEL: str = "google/flan-t5-base"
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
