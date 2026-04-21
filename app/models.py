from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func   
from app.database import Base 

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expenses = relationship("Expense", back_populates="owner")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    description = Column(String, nullable=True)

    date = Column(DateTime, server_default=func.now())

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="expenses")


class MonthlyReport(Base):
    __tablename__ = "monthly_reports"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    month = Column(String, nullable=False)  # e.g. "2026-01"

    total_expense = Column(Float, default=0)

    created_at = Column(DateTime(timezone=True), server_default=func.now())




  

    