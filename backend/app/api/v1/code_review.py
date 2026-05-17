from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

MOCK_PRS = [
    {
        "id": "pr-1",
        "number": 247,
        "title": "feat: Implement vector search with Qdrant for knowledge retrieval",
        "author": "alice-chen",
        "avatar": "AC",
        "base": "main",
        "head": "feature/qdrant-integration",
        "status": "open",
        "created_at": "2h ago",
        "additions": 342,
        "deletions": 89,
        "changed_files": 12,
        "review_status": "needs_review",
        "labels": ["feature", "ml", "high-priority"],
        "ai_review": {
            "overall_score": 87,
            "bugs": 0,
            "vulnerabilities": 1,
            "performance_issues": 2,
            "code_smells": 3,
            "summary": "Strong implementation of the Qdrant vector search pipeline. The embedding generation is efficient, but there are some potential performance bottlenecks in the batch processing logic.",
            "findings": [
                {
                    "type": "vulnerability",
                    "severity": "medium",
                    "file": "services/rag_service.py",
                    "line": 84,
                    "message": "API key is logged in plain text during initialization. Use a masked logger.",
                    "suggestion": "Use `logging.debug('API key configured: [MASKED]')` instead of logging the full key."
                },
                {
                    "type": "performance",
                    "severity": "low",
                    "file": "services/rag_service.py",
                    "line": 127,
                    "message": "Sequential embedding generation for batch of documents. Consider using async batch processing.",
                    "suggestion": "Use `asyncio.gather()` with batch size limits to parallelize embedding generation."
                },
                {
                    "type": "performance",
                    "severity": "low",
                    "file": "services/rag_service.py",
                    "line": 203,
                    "message": "Missing connection pooling for Qdrant client. Could cause connection exhaustion under load.",
                    "suggestion": "Initialize QdrantClient once at application startup and reuse the connection."
                },
            ],
            "recommendations": [
                "Add integration tests for the vector search pipeline",
                "Consider adding fallback to keyword search when vector search returns no results",
                "Document the embedding model version for reproducibility"
            ]
        }
    },
    {
        "id": "pr-2",
        "number": 246,
        "title": "fix: Resolve race condition in concurrent webhook processing",
        "author": "bob-kumar",
        "avatar": "BK",
        "base": "main",
        "head": "fix/webhook-race-condition",
        "status": "open",
        "created_at": "6h ago",
        "additions": 67,
        "deletions": 23,
        "changed_files": 4,
        "review_status": "changes_requested",
        "labels": ["bug", "critical"],
        "ai_review": {
            "overall_score": 94,
            "bugs": 0,
            "vulnerabilities": 0,
            "performance_issues": 0,
            "code_smells": 1,
            "summary": "Excellent fix for the race condition. The mutex implementation is correct and the test coverage is thorough.",
            "findings": [
                {
                    "type": "code_smell",
                    "severity": "low",
                    "file": "handlers/webhook.py",
                    "line": 45,
                    "message": "Magic timeout value (30) should be extracted to a named constant.",
                    "suggestion": "Define `WEBHOOK_PROCESSING_TIMEOUT = 30` at module level."
                }
            ],
            "recommendations": ["Consider adding circuit breaker pattern for external webhook calls"]
        }
    },
    {
        "id": "pr-3",
        "number": 245,
        "title": "perf: Optimize database query performance with proper indexing",
        "author": "sarah-williams",
        "avatar": "SW",
        "base": "main",
        "head": "perf/db-query-optimization",
        "status": "merged",
        "created_at": "1d ago",
        "additions": 134,
        "deletions": 45,
        "changed_files": 7,
        "review_status": "approved",
        "labels": ["performance", "database"],
        "ai_review": {
            "overall_score": 96,
            "bugs": 0,
            "vulnerabilities": 0,
            "performance_issues": 0,
            "code_smells": 0,
            "summary": "Excellent performance optimization. The composite indexes are well-chosen and the query rewrites show strong PostgreSQL expertise.",
            "findings": [],
            "recommendations": ["Monitor query performance in production with pg_stat_statements"]
        }
    }
]


@router.get("/")
async def list_pull_requests(status: Optional[str] = None):
    prs = MOCK_PRS
    if status:
        prs = [pr for pr in prs if pr["status"] == status]
    return {"pull_requests": prs, "total": len(prs)}


@router.get("/{pr_id}")
async def get_pull_request(pr_id: str):
    pr = next((p for p in MOCK_PRS if p["id"] == pr_id), None)
    if not pr:
        raise HTTPException(status_code=404, detail="Pull request not found")
    return pr


@router.post("/{pr_id}/review")
async def trigger_ai_review(pr_id: str):
    return {
        "status": "processing",
        "message": "AI review initiated. Analysis will complete in ~30 seconds.",
        "pr_id": pr_id,
    }
