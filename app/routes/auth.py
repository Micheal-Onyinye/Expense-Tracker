from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas.login import UserLogin, Token
from app.schemas.signup import UserSignup, UserSignupResponse
from app.auth import (
    hash_password,
    verify_password,
    create_access_token
)
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/register", response_model=UserSignupResponse)
def register(user: UserSignup, db: Session = Depends(get_db)):

    # check if user exists
    existing_user = db.query(User).filter(
        (User.email == user.email) | (User.username == user.username)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )

    # hash password
    hashed_pwd = hash_password(user.password)

    # create user
    new_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user




@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # find user
    db_user = db.query(User).filter(
        User.username == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    # verify password
    if not verify_password(form_data.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    # create JWT token
    token = create_access_token(
        data={"sub": db_user.username}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }