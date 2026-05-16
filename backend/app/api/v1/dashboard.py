from fastapi import APIRouter
from typing import Optional
import random
from datetime import datetime, timedelta

router = APIRouter()


def generate_mock_dashboard():
    return {
        "team_health": {
            "score": 87,
            "trend": "+3.2%",
            "status": "excellent",
            "breakdown": {
                "velocity": 91,
                "collaboration": 84,
                "code_quality": 89,
                "delivery": 82
            }
        },
        "sprint_health": {
            "score": 74,
            "trend": "-1.5%",
            "status": "good",
            "completed_points": 42,
            "total_points": 56,
            "days_remaining": 4,
            "at_risk_items": 3
        },
        "risk_score": {
            "score": 32,
            "trend": "+5.1%",
            "status": "low",
            "confidence": 0.91,
            "factors": {
                "technical_debt": 38,
                "delivery_risk": 29,
                "team_bottleneck": 24,
                "dependency_risk": 41
            }
        },
        "deployment_readiness": {
            "score": 91,
            "status": "ready",
            "last_deploy": "2h ago",
            "pipeline_status": "passing",
            "coverage": 87.3
        },
        "productivity": {
            "prs_merged_week": 23,
            "avg_review_time": "4.2h",
            "commit_frequency": 8.3,
            "issues_closed": 31
        },
        "repositories": [
            {"name": "api-gateway", "language": "TypeScript", "activity": 94, "risk": 12},
            {"name": "ml-pipeline", "language": "Python", "activity": 87, "risk": 28},
            {"name": "frontend-app", "language": "React", "activity": 76, "risk": 19},
            {"name": "auth-service", "language": "Go", "activity": 62, "risk": 35},
            {"name": "data-processor", "language": "Python", "activity": 54, "risk": 44},
        ],
        "commit_activity": [
            {"date": (datetime.now() - timedelta(days=i)).strftime("%b %d"), 
             "commits": random.randint(4, 22)} 
            for i in range(14, 0, -1)
        ],
        "recent_events": [
            {"type": "deploy", "message": "v2.4.1 deployed to production", "time": "2h ago", "status": "success"},
            {"type": "pr", "message": "feat: Add RAG search pipeline merged", "time": "4h ago", "status": "merged"},
            {"type": "alert", "message": "Sprint deadline at risk — 3 items blocked", "time": "5h ago", "status": "warning"},
            {"type": "review", "message": "Security vulnerability detected in auth-service", "time": "1d ago", "status": "danger"},
            {"type": "meeting", "message": "Sprint planning transcript processed", "time": "2d ago", "status": "info"},
        ]
    }


@router.get("/overview")
async def get_dashboard_overview():
    return generate_mock_dashboard()


@router.get("/metrics")
async def get_metrics():
    return {
        "engineering_score": 88,
        "deployment_frequency": "3.2/week",
        "lead_time": "1.8 days",
        "change_failure_rate": "4.2%",
        "mttr": "42 minutes",
        "dora_tier": "Elite",
    }
