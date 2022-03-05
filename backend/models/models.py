from pydantic import BaseModel
from bson import ObjectId

class User(BaseModel):
    _id: ObjectId
    name:str
    email:str
    password:str
    losses:int
    username:str
    wins:int
