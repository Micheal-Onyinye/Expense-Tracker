from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)  

    category: str = Field(min_length=2, max_length=30)

    description: Optional[str] = Field(default=None, max_length=200)



class ExpenseResponse(BaseModel):
    id: int
    amount: float
    category: str
    description: str | None
    date: datetime
    user_id: int

    class Config:
        from_attributes = True


class ExpenseFilter(BaseModel):
    category: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None