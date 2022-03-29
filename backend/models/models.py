from datetime import datetime
from pydantic import BaseModel, Field
from bson import ObjectId

'''
The next block of code allows us to add ObjectId's to the database.
Line 61-64 is also needed.
Here is an example POST query:
{
  "user": "62013009229563fdf6f8a1c3",
  "team_for": "6201411f229563fdf6f8a1d1",
  "team_agaisnt": "6201414e229563fdf6f8a1d2",
  "details": "Moneyline",
  "amount": 100,
  "odds": "-110",
  "comments": [
    ""
  ],
  "likes": 1,
  "outcome": "Pending",
  "date": "2022-03-29T15:00:18.128Z"
}
So you just post the ObjectId string alue thing and it converts it to an ObjectId.
'''
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")
        
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
    user: PyObjectId = Field(default_factory=PyObjectId, alias="user")
    team_for: PyObjectId = Field(default_factory=PyObjectId, alias="team_for")
    team_against: PyObjectId = Field(default_factory=PyObjectId, alias="team_against") 
    details: str
    amount: float
    odds: str
    comments: list
    likes: int
    outcome: str
    date: datetime
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        

        
    
#Team class model
class Team(BaseModel):
    _id: ObjectId
    city:str
    team:str
    league:str
    abv:str
