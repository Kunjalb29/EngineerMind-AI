from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class WorkspaceRequest(BaseModel):
    messages: List[ChatMessage]
    context: Optional[str] = None
    mode: Optional[str] = "general"  # general, repo, sprint, risk, knowledge


MOCK_RESPONSES = {
    "explain": "The **api-gateway** repository follows a **microservices gateway pattern** using Fastify under the hood.\n\n**Architecture Overview:**\n- **Entry Point**: `src/index.ts` bootstraps the Fastify server with plugin-based architecture\n- **Route Registration**: Dynamic route loading from `src/routes/` with versioned API prefixes\n- **Middleware Pipeline**: Auth → Rate Limit → Logging → Request validation → Handler\n\n**Key Design Decisions:**\n1. Redis-backed rate limiting with sliding window algorithm\n2. JWT verification via RS256 (migrated from HS256 in Nov, see ADR-012)\n3. Circuit breaker pattern for upstream service calls\n\n**Current Health**: 91/100 — excellent architecture with minimal tech debt.",
    "risk": "Based on the **XGBoost risk model** (confidence: 91%), here's the current sprint analysis:\n\n🔴 **High Risk**: Alice Chen's queue has 8 pending items — she owns the critical RAG pipeline\n🟡 **Medium Risk**: External API dependency for payment processing is unresolved\n🟢 **Low Risk**: Infrastructure and deployment pipeline are healthy\n\n**Prediction**: 74% probability of on-time delivery. Expected delay if risks materialize: ~1.2 days.\n\n**Recommended Actions:**\n1. Reassign 2 of Alice's stories to Bob (he has bandwidth)\n2. Escalate payment API dependency today — it's on the critical path\n3. No action needed on infrastructure",
    "default": "I'm analyzing your engineering data across repositories, meetings, and pull requests. Here's what I found:\n\nYour team's **engineering velocity** is trending upward (+12% this sprint) driven by the recent improvements to the deployment pipeline. The **RAG integration** is the highest-impact item currently in flight.\n\nWhat would you like to explore deeper? I can analyze specific repositories, sprint risks, meeting action items, or answer questions about your codebase."
}


@router.post("/chat")
async def workspace_chat(request: WorkspaceRequest):
    last_message = request.messages[-1].content.lower() if request.messages else ""
    
    if "explain" in last_message or "architecture" in last_message or "how" in last_message:
        response = MOCK_RESPONSES["explain"]
    elif "risk" in last_message or "sprint" in last_message or "delay" in last_message:
        response = MOCK_RESPONSES["risk"]
    else:
        response = MOCK_RESPONSES["default"]
    
    return {
        "role": "assistant",
        "content": response,
        "sources": [
            {"type": "repository", "name": "api-gateway", "confidence": 0.94},
            {"type": "meeting", "name": "Sprint 24 Planning", "confidence": 0.87},
        ],
        "model": "gpt-4o",
        "tokens_used": 342,
    }


@router.get("/context")
async def get_workspace_context():
    return {
        "repositories": ["api-gateway", "ml-pipeline", "frontend-app"],
        "active_sprint": "Sprint 24",
        "recent_meetings": ["Q4 Sprint Planning", "Architecture Review"],
        "open_prs": 7,
        "active_risks": 3,
    }
