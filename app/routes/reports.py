from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.database import get_db
from app.models import Expense
from app.dependencies import get_current_user
from app.services.service_report import generate_monthly_report
from app.models import MonthlyReport

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("/total")
def total_expenses(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    total = db.query(
        func.sum(Expense.amount)
    ).filter(
        Expense.user_id == current_user.id
    ).scalar()

    return {
        "user": current_user.username,
        "total_expenses": total or 0
    }

@router.get("/daily")
def daily_summary(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    results = db.query(
        Expense.date,
        func.sum(Expense.amount).label("total")
    ).filter(
        Expense.user_id == current_user.id
    ).group_by(
        Expense.date
    ).order_by(
        Expense.date
    ).all()

    return [
        {
            "date": r.date,
            "total": r.total
        }
        for r in results
    ]

@router.get("/monthly")
def get_reports(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return db.query(MonthlyReport).filter(
        MonthlyReport.user_id == current_user.id
    ).all()