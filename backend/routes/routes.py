from fastapi import APIRouter
from config.database import users_collection, bets_collection, teams_collection
from models.models import User
from schemas.schemas import user_serializer, users_serializer, bet_serializer, bets_serializer

api_router = APIRouter()

#Greeting message
@api_router.get("/")
async def welcome():
    return {"message":"Welcome to the BetShare API"}

#Get all users
@api_router.get("/users")
async def get_users():
    users = users_serializer(users_collection.find())
    return {"status":"ok", "data":users}

#Get all bets
@api_router.get("/bets")
async def get_bets():
    bets = bets_serializer(bets_collection.aggregate([
    {
        '$lookup': {
            'from': 'teams',
            'localField': 'team_for',
            'foreignField': '_id',
            'as': 'team_for'
        }
    }, {
        '$lookup': {
            'from': 'teams',
            'localField': 'team_agaisnt',
            'foreignField': '_id',
            'as': 'team_agaisnt'
        }
    }, {
        '$lookup': {
            'from': 'users',
            'localField': 'user',
            'foreignField': '_id',
            'as': 'user'
        }
    }
]))
    return {"status":"ok", "data":bets}