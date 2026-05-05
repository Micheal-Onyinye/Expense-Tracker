from fastapi import FastAPI
from .database import engine, Base
from app.routes import expenses, reports, auth
from fastapi.middleware.cors import CORSMiddleware
from app.database import DATABASE_URL

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
     allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print("DATABASE_URL:", DATABASE_URL)
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(reports.router)

