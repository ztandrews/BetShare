from datetime import datetime
from subprocess import list2cmdline
from pydantic import BaseModel
from bson import ObjectId

#User class model
class User(BaseModel):
    _id: ObjectId
    name:str
    email:str
    password:str
    losses:int
    username:str
    wins:int

#Bet class model
class Bet(BaseModel):
    _id: ObjectId
    user: list
    team_for: list
    team_against:list
    details: str
    amount: float
    odds: str
    comments: list
    likes: int
    outcome: str
    date: datetime