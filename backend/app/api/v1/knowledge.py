from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    sources: List[str] = ["repositories", "meetings", "prs", "docs"]
    limit: int = 10


MOCK_RESULTS = {
    "why was authentication changed last month": [
        {
            "id": "r1",
            "score": 0.96,
            "type": "meeting",
            "title": "Security Architecture Review — Nov 14",
            "excerpt": "Emma: The JWT implementation had a critical vulnerability discovered by our security audit. We decided to migrate from HS256 to RS256 and implement token rotation. Alice will lead the refactor...",
            "source": "Sprint Meeting Transcript",
            "date": "Nov 14, 2025",
            "link": "/meetings/meeting-security-review"
        },
        {
            "id": "r2",
            "score": 0.92,
            "type": "pr",
            "title": "PR #231: refactor: Migrate JWT to RS256 with token rotation",
            "excerpt": "Migrates authentication from HS256 to RS256 asymmetric signing. Adds automatic token rotation every 24h. Resolves CVE-2024-XXXX discovered in security audit...",
            "source": "GitHub Pull Request",
            "date": "Nov 16, 2025",
            "link": "/code-review/pr-security"
        },
        {
            "id": "r3",
            "score": 0.88,
            "type": "commit",
            "title": "refactor(auth): implement RS256 JWT with rotation policy",
            "excerpt": "Commit by alice-chen: Complete auth overhaul as discussed in security review. Added key pair rotation, Redis-backed token blacklist, and comprehensive audit logging...",
            "source": "Repository Commit",
            "date": "Nov 17, 2025",
            "link": "/repositories/repo-4"
        },
        {
            "id": "r4",
            "score": 0.84,
            "type": "doc",
            "title": "Security Architecture Decision Record (ADR-012)",
            "excerpt": "Decision: Migrate to RS256 JWT authentication. Rationale: HS256 shared secret model creates single point of failure. RS256 allows verification without exposing signing key...",
            "source": "Documentation",
            "date": "Nov 15, 2025",
            "link": "/knowledge/adr-012"
        }
    ]
}


@router.post("/search")
async def search_knowledge(request: SearchRequest):
    query_lower = request.query.lower()
    results = MOCK_RESULTS.get("why was authentication changed last month", [])
    
    # Return contextual mock results
    return {
        "query": request.query,
        "results": results[:request.limit],
        "total": len(results),
        "model": "BGE-Large-EN-v1.5",
        "recall_at_10": 0.94,
        "search_time_ms": 47,
    }


@router.get("/recent")
async def get_recent_queries():
    return {
        "recent": [
            "Why was authentication changed last month?",
            "What is the deployment process for api-gateway?",
            "Who owns the ML pipeline?",
            "What was decided about the caching strategy?",
        ]
    }
