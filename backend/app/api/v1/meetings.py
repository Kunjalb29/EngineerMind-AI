from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

MOCK_MEETINGS = [
    {
        "id": "meeting-1",
        "title": "Q4 Sprint Planning — Backend Team",
        "date": "2025-12-09",
        "duration": "54 minutes",
        "participants": ["Alice Chen", "Bob Kumar", "Sarah Williams", "Marcus Johnson", "Team Lead: Jordan Park"],
        "status": "processed",
        "transcript_preview": "Jordan: Let's kick off sprint 24 planning. We have 23 story points carried over from last sprint. Alice, can you walk us through the Qdrant integration status?...",
        "summary": "Sprint 24 planning session focused on completing the RAG pipeline integration and addressing 3 critical bugs from the previous sprint. Team agreed on a revised capacity of 58 story points due to Alice's partial availability. Key decision: defer the caching layer refactor to Sprint 25.",
        "action_items": [
            {"id": "ai-1", "task": "Complete Qdrant vector search integration", "assignee": "Alice Chen", "due": "Dec 12", "priority": "high", "status": "in_progress"},
            {"id": "ai-2", "task": "Fix webhook race condition in auth service", "assignee": "Bob Kumar", "due": "Dec 11", "priority": "critical", "status": "done"},
            {"id": "ai-3", "task": "Write integration tests for ML pipeline", "assignee": "Marcus Johnson", "due": "Dec 13", "priority": "medium", "status": "todo"},
            {"id": "ai-4", "task": "Update API documentation for v2 endpoints", "assignee": "Sarah Williams", "due": "Dec 14", "priority": "low", "status": "todo"},
        ],
        "generated_tickets": [
            {"type": "STORY", "title": "RAG Pipeline — Production Readiness", "points": 8, "epic": "Knowledge Search"},
            {"type": "BUG", "title": "Webhook race condition causes duplicate events", "points": 3, "epic": "Core Infrastructure"},
            {"type": "TASK", "title": "Integration test coverage for ML endpoints", "points": 5, "epic": "ML Pipeline"},
        ],
        "sentiment": {"overall": "positive", "energy": 78, "alignment": 89},
        "key_decisions": [
            "Defer caching layer refactor to Sprint 25",
            "Prioritize RAG pipeline over new feature development",
            "Add Marcus to the frontend team for Sprint 24 only"
        ],
        "risks_identified": [
            "Alice's partial availability may delay RAG integration",
            "Missing test coverage could cause regressions in sprint 25"
        ]
    },
    {
        "id": "meeting-2",
        "title": "Architecture Review — Microservices Migration",
        "date": "2025-12-07",
        "duration": "1h 23 minutes",
        "participants": ["CTO: Emma Rodriguez", "Alice Chen", "Bob Kumar", "DevOps: Chris Park"],
        "status": "processed",
        "transcript_preview": "Emma: The monolith is becoming a bottleneck. We need to decide on our microservices migration strategy...",
        "summary": "Architecture review concluded that a strangler fig pattern is the preferred approach for migrating the monolith. Decision to start with the auth and notification services as first candidates.",
        "action_items": [
            {"id": "ai-5", "task": "Create migration runbook for auth service", "assignee": "Alice Chen", "due": "Dec 15", "priority": "high", "status": "todo"},
            {"id": "ai-6", "task": "Set up service mesh with Istio", "assignee": "Chris Park", "due": "Dec 20", "priority": "medium", "status": "todo"},
        ],
        "generated_tickets": [
            {"type": "EPIC", "title": "Monolith to Microservices Migration", "points": None, "epic": "Architecture"},
            {"type": "STORY", "title": "Auth Service Extraction", "points": 21, "epic": "Architecture"},
        ],
        "sentiment": {"overall": "neutral", "energy": 65, "alignment": 72},
        "key_decisions": ["Adopt strangler fig pattern", "Auth service is first migration candidate"],
        "risks_identified": ["Team lacks Kubernetes expertise", "Migration may disrupt ongoing feature work"]
    }
]


@router.get("/")
async def list_meetings():
    return {"meetings": MOCK_MEETINGS, "total": len(MOCK_MEETINGS)}


@router.get("/{meeting_id}")
async def get_meeting(meeting_id: str):
    meeting = next((m for m in MOCK_MEETINGS if m["id"] == meeting_id), None)
    if not meeting:
        raise HTTPException(status_code=404, detail="Meeting not found")
    return meeting


@router.post("/upload")
async def upload_meeting(file: UploadFile = File(...)):
    return {
        "id": "meeting-new",
        "status": "processing",
        "filename": file.filename,
        "message": "Meeting uploaded. Transcription and analysis in progress (estimated 2-3 minutes).",
        "steps": [
            {"step": "transcription", "status": "in_progress"},
            {"step": "summarization", "status": "pending"},
            {"step": "action_items", "status": "pending"},
            {"step": "ticket_generation", "status": "pending"},
        ]
    }
