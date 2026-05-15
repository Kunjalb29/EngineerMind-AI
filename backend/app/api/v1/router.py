from fastapi import APIRouter
from app.api.v1 import (
    repositories,
    code_review,
    meetings,
    risk,
    knowledge,
    dashboard,
    workspace,
)

api_router = APIRouter()

api_router.include_router(repositories.router, prefix="/repositories", tags=["Repository Intelligence"])
api_router.include_router(code_review.router, prefix="/code-review", tags=["AI Code Review"])
api_router.include_router(meetings.router, prefix="/meetings", tags=["Meeting Intelligence"])
api_router.include_router(risk.router, prefix="/risk", tags=["Risk Prediction"])
api_router.include_router(knowledge.router, prefix="/knowledge", tags=["Knowledge Search"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Executive Dashboard"])
api_router.include_router(workspace.router, prefix="/workspace", tags=["AI Workspace"])
