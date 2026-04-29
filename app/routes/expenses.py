from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Expense
from app.schemas.expenses import ExpenseCreate, ExpenseResponse, ExpenseUpdate
from app.dependencies import get_current_user
from app.schemas.expenses import ExpenseFilter

router = APIRouter(prefix="/expenses", tags=["Expenses"])

@router.post("/", response_model=ExpenseResponse)
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    new_expense = Expense(
        amount=expense.amount,
        category=expense.category,
        description=expense.description,
        user_id=current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

@router.get("/", response_model=list[ExpenseResponse])
def get_expenses(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    expenses = db.query(Expense).filter(
        Expense.user_id == current_user.id
    ).all()

    return expenses

@router.get("/", response_model=list[ExpenseResponse])
def get_expense(
    filters: ExpenseFilter = Depends(),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    query = db.query(Expense).filter(
        Expense.user_id == current_user.id
    )
    if filters.category:
        query = query.filter(Expense.category == filters.category)

    if filters.start_date:
        query = query.filter(Expense.date >= filters.start_date)

    if filters.end_date:
        query = query.filter(Expense.date <= filters.end_date)

    return query.all()



@router.put("/{expense_id}", response_model=ExpenseResponse)
def update_expense(
    expense_id: int,
    updated_data: ExpenseUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    update_data = updated_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
            setattr(expense, key, value)

    db.commit()
    db.refresh(expense)

    return expense


@router.delete("/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Expense not found"
        )

    db.delete(expense)
    db.commit()

    return {"message": "Expense deleted successfully"}