from fastapi import FastAPI
from .database import engine, Base
from app.routes import expenses, reports, auth

app = FastAPI()

app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(reports.router)

