from fastapi import FastAPI
from .database import engine, Base
from app.routes import expenses, reports, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "https://expense-tracker-hhlo.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(reports.router)

