from pydantic import BaseModel, EmailStr, Field, field_validator
import re

class UserSignup(BaseModel):
    email: EmailStr

    username: str = Field(min_length=3, max_length=20)

    password: str = Field(min_length=6, max_length=30)

    # Username: only letters and numbers
    @field_validator("username")
    @classmethod
    def validate_username(cls, v):
        if not re.fullmatch(r"[a-zA-Z0-9]+", v):
            raise ValueError("Username must contain only letters and numbers")
        return v

    # Password: strong rules
    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters long")

        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")

        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")

        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one number")

        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", v):
            raise ValueError("Password must contain at least one special character")

        return v
    

class UserSignupResponse(BaseModel):
    id: int
    email: EmailStr
    username: str

    class Config:
      from_attributes = True