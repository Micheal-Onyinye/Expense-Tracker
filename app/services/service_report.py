from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime
from app.models import Expense, MonthlyReport

def generate_monthly_report(db: Session, user_id: int, month: str):

    start_date = datetime.strptime(month + "-01", "%Y-%m-%d")

    if start_date.month == 12:
        end_date = start_date.replace(year=start_date.year + 1, month=1)
    else:
        end_date = start_date.replace(month=start_date.month + 1)

    total = db.query(func.sum(Expense.amount)).filter(
        Expense.user_id == user_id,
        Expense.date >= start_date,
        Expense.date < end_date
    ).scalar()

    report = MonthlyReport(
        user_id=user_id,
        month=month,
        total_expense=total or 0
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report