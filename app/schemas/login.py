from pydantic import BaseModel


class UserLogin(BaseModel):
    username: str
    password: str 

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str
    email: str | None = None

    class Config:
      from_attributes = True