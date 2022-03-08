from datetime import datetime
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
    user: dict
    team_for: str
    team_against:str
    details: str
    amount: float
    odds: str
    comments: list
    likes: int
    outcome: str
    date: datetime
    
#Team class model
class Team(BaseModel):
    _id: ObjectId
    city:str
    team:str
    league:str
    abv:str
