from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()


@router.get("/assessment")
async def get_risk_assessment():
    return {
        "overall_risk": 32,
        "risk_level": "low",
        "confidence": 0.91,
        "model_version": "xgboost-v2.1",
        "last_updated": "10 minutes ago",
        "radar": {
            "technical_debt": 38,
            "delivery_risk": 29,
            "team_bottleneck": 24,
            "dependency_risk": 41,
            "security_risk": 18,
            "infrastructure_risk": 22,
        },
        "sprint_prediction": {
            "on_time_probability": 0.74,
            "delay_days_expected": 1.2,
            "at_risk_stories": ["ENG-234", "ENG-241", "ENG-251"],
            "blockers": ["Alice partial availability", "External API dependency unresolved"],
        },
        "release_readiness": {
            "score": 91,
            "blockers": 0,
            "warnings": 2,
            "critical_path": ["auth-service", "api-gateway"],
        },
        "team_bottlenecks": [
            {"member": "Alice Chen", "queue_size": 8, "risk": "high", "domain": "ML/Backend"},
            {"member": "Bob Kumar", "queue_size": 5, "risk": "medium", "domain": "Frontend"},
        ],
        "trend": [
            {"week": "Week 44", "risk": 41},
            {"week": "Week 45", "risk": 38},
            {"week": "Week 46", "risk": 35},
            {"week": "Week 47", "risk": 32},
        ],
        "recommendations": [
            {"priority": "high", "action": "Unblock Alice Chen — reassign 2 stories to reduce queue"},
            {"priority": "medium", "action": "Resolve external API dependency before sprint end"},
            {"priority": "low", "action": "Add redundancy to single points of failure in auth-service"},
        ]
    }


@router.get("/history")
async def get_risk_history():
    return {
        "history": [
            {"date": "2025-11-01", "score": 54, "events": ["Major refactor started"]},
            {"date": "2025-11-15", "score": 48, "events": ["Security audit completed"]},
            {"date": "2025-12-01", "score": 41, "events": ["Sprint 23 at risk"]},
            {"date": "2025-12-09", "score": 32, "events": ["Team velocity improved"]},
        ]
    }
