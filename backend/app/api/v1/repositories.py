from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import random
from datetime import datetime, timedelta

router = APIRouter()


class ConnectRepoRequest(BaseModel):
    github_url: str
    name: Optional[str] = None


MOCK_REPOS = [
    {
        "id": "repo-1",
        "name": "api-gateway",
        "full_name": "engineermind/api-gateway",
        "language": "TypeScript",
        "stars": 234,
        "forks": 45,
        "open_issues": 12,
        "open_prs": 7,
        "last_commit": "2h ago",
        "branches": 14,
        "contributors": 8,
        "activity_score": 94,
        "health_score": 91,
        "description": "High-performance API gateway with rate limiting, auth, and intelligent routing",
        "topics": ["microservices", "typescript", "api-gateway"],
        "architecture_summary": "Microservice-based API gateway using Fastify with Redis caching layer...",
        "tech_debt_score": 12,
        "x": 0.2, "y": 0.7, "z": 0.1,
    },
    {
        "id": "repo-2",
        "name": "ml-pipeline",
        "full_name": "engineermind/ml-pipeline",
        "language": "Python",
        "stars": 189,
        "forks": 32,
        "open_issues": 8,
        "open_prs": 4,
        "last_commit": "5h ago",
        "branches": 9,
        "contributors": 6,
        "activity_score": 87,
        "health_score": 83,
        "description": "End-to-end ML training and inference pipeline with XGBoost, CodeBERT, and Whisper",
        "topics": ["machine-learning", "python", "transformers"],
        "architecture_summary": "Modular ML pipeline with separate training, evaluation, and serving stages...",
        "tech_debt_score": 28,
        "x": -0.4, "y": 0.2, "z": 0.5,
    },
    {
        "id": "repo-3",
        "name": "frontend-app",
        "full_name": "engineermind/frontend-app",
        "language": "TypeScript",
        "stars": 156,
        "forks": 28,
        "open_issues": 19,
        "open_prs": 11,
        "last_commit": "1h ago",
        "branches": 22,
        "contributors": 12,
        "activity_score": 76,
        "health_score": 78,
        "description": "Next.js 15 frontend with Aurora Forge design system",
        "topics": ["nextjs", "react", "typescript"],
        "architecture_summary": "App Router-based Next.js app with server components and streaming...",
        "tech_debt_score": 19,
        "x": 0.6, "y": -0.3, "z": 0.2,
    },
    {
        "id": "repo-4",
        "name": "auth-service",
        "full_name": "engineermind/auth-service",
        "language": "Go",
        "stars": 98,
        "forks": 14,
        "open_issues": 5,
        "open_prs": 2,
        "last_commit": "1d ago",
        "branches": 6,
        "contributors": 4,
        "activity_score": 62,
        "health_score": 72,
        "description": "High-throughput authentication and authorization microservice",
        "topics": ["golang", "auth", "jwt"],
        "architecture_summary": "gRPC-based auth service with PostgreSQL storage and Redis sessions...",
        "tech_debt_score": 35,
        "x": -0.1, "y": -0.6, "z": 0.4,
    },
    {
        "id": "repo-5",
        "name": "data-processor",
        "full_name": "engineermind/data-processor",
        "language": "Python",
        "stars": 67,
        "forks": 11,
        "open_issues": 23,
        "open_prs": 5,
        "last_commit": "3d ago",
        "branches": 8,
        "contributors": 3,
        "activity_score": 54,
        "health_score": 61,
        "description": "Async data processing pipeline with Kafka and PostgreSQL",
        "topics": ["kafka", "python", "data-engineering"],
        "architecture_summary": "Event-driven pipeline consuming from Kafka, processing with Pandas...",
        "tech_debt_score": 44,
        "x": 0.3, "y": 0.1, "z": -0.6,
    },
]


@router.get("/")
async def list_repositories():
    return {"repositories": MOCK_REPOS, "total": len(MOCK_REPOS)}


@router.get("/{repo_id}")
async def get_repository(repo_id: str):
    repo = next((r for r in MOCK_REPOS if r["id"] == repo_id), None)
    if not repo:
        raise HTTPException(status_code=404, detail="Repository not found")
    return repo


@router.post("/connect")
async def connect_repository(request: ConnectRepoRequest):
    return {
        "id": "repo-new",
        "name": request.name or request.github_url.split("/")[-1],
        "status": "analyzing",
        "message": "Repository connected. Analysis started...",
    }


@router.get("/{repo_id}/commits")
async def get_commits(repo_id: str, limit: int = 20):
    commits = [
        {
            "sha": f"a{i}b{i}c{i}d{i}",
            "message": ["feat: Add RAG knowledge search", "fix: Resolve auth token expiry", 
                        "refactor: Optimize database queries", "perf: Improve API response time",
                        "docs: Update API reference", "test: Add unit tests for ML pipeline"][i % 6],
            "author": ["Alice Chen", "Bob Kumar", "Sarah Williams", "Marcus Johnson"][i % 4],
            "time": f"{i * 3}h ago",
            "additions": random.randint(10, 200),
            "deletions": random.randint(5, 80),
        }
        for i in range(1, limit + 1)
    ]
    return {"commits": commits}


@router.get("/{repo_id}/contributors")
async def get_contributors(repo_id: str):
    return {
        "contributors": [
            {"name": "Alice Chen", "commits": 234, "avatar": "AC", "expertise": ["Backend", "ML"], "impact": 94},
            {"name": "Bob Kumar", "commits": 189, "avatar": "BK", "expertise": ["Frontend", "DevOps"], "impact": 87},
            {"name": "Sarah Williams", "commits": 142, "avatar": "SW", "expertise": ["Security", "Backend"], "impact": 79},
            {"name": "Marcus Johnson", "commits": 98, "avatar": "MJ", "expertise": ["ML", "Data"], "impact": 71},
        ]
    }


@router.get("/{repo_id}/analysis")
async def get_repository_analysis(repo_id: str):
    return {
        "architecture_summary": "This repository follows a clean microservices architecture with clear separation of concerns. The codebase demonstrates strong TypeScript patterns with comprehensive type safety and follows domain-driven design principles.",
        "tech_debt_areas": [
            {"area": "Authentication Module", "severity": "medium", "effort": "2 days"},
            {"area": "Legacy API v1 endpoints", "severity": "low", "effort": "5 days"},
            {"area": "Missing test coverage in services/", "severity": "high", "effort": "3 days"},
        ],
        "security_findings": [
            {"type": "Dependency Vulnerability", "package": "lodash", "severity": "moderate", "fixed_in": "4.17.21"},
        ],
        "recommendations": [
            "Upgrade to Node.js 22 LTS for performance improvements",
            "Add rate limiting to public API endpoints",
            "Implement distributed tracing with OpenTelemetry",
        ],
        "language_breakdown": {"TypeScript": 78, "JavaScript": 12, "YAML": 6, "Other": 4},
    }
