import this
from fastapi import APIRouter
from config.database import users_collection, bets_collection, teams_collection
from models.models import User, Bet
from schemas.schemas import user_serializer, users_serializer, bet_serializer, bets_serializer, team_searializer, teams_searializer, bet_serializer_no_user, bets_serializer_no_user
from bson import ObjectId
import pymongo

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

#Get user by ID
@api_router.get("/users/{user_id}")
async def get_user_by_id(user_id):
    id = user_id
    id_object = ObjectId(id)
    user = users_serializer(users_collection.find({"_id":id_object}))
    print((user[0]["following"][0]))
    return {"status":"ok", "data":user}

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
            'localField': 'team_against',
            'foreignField': '_id',
            'as': 'team_against'
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

#Get all teams
@api_router.get("/teams")
async def get_teams():
    teams = teams_searializer(teams_collection.find())
    return {"status":"ok", "data":teams}

#Get teams by league
@api_router.get("/teams/{league}")
async def get_teams_by_league(league):
    teams = teams_searializer(teams_collection.find({"league":league}))
    return {"status":"ok","data":teams}

#Post a new bet
@api_router.post("/bets")
async def post_bet(bet: Bet):
    _id = bets_collection.insert_one(dict(bet))
    return {"status":"ok", "data":"success"}

#Get bets by user
@api_router.get("/bets/{user_id}")
async def get_bets_by_user(user_id):
    id = user_id
    id_object = ObjectId(id)
    bets= bets_serializer_no_user(bets_collection.aggregate([
    {
        '$match': {
            'user': id_object
        }
    },
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
            'localField': 'team_against',
            'foreignField': '_id',
            'as': 'team_against'
        }
    },
    {
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'user_data'
                }
            }
]))
    return {"status":"ok","data":bets}

#Register
@api_router.post("/register")
async def register_user(user: User):
    _id = users_collection.insert_one(dict(user))
    return {"status":"ok"}

#Login
@api_router.post("/login")
async def login_user(username, password):
    user = users_serializer(users_collection.find({"username":username, "password":password}))
    resp = len(user)
    if (resp == 0):
        return {"status":"invalid username or password","data":user}
    else:
        return {"status":"ok","data":user}

#Update bet status
@api_router.put("/status/{bet_id}/{status}")
async def update_status(bet_id, status):
    id = bet_id
    id_object = ObjectId(id)
    bets_collection.update_one({"_id":id_object}, {"$set" :{"outcome":status}})
    return {"status":"ok", "data":"ok"}

#Get feed
@api_router.get("/feed/{user_id}")
async def get_feed(user_id):
    id = user_id
    id_object = ObjectId(id)
    user = users_serializer(users_collection.find({"_id":id_object}))
    user = user[0]
    following = user["following"]
    bets = []
    this_users_bets=bets_serializer_no_user((bets_collection.aggregate([
            {
                '$match': {
                    'user': id_object
                }
            },
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
                    'localField': 'team_against',
                    'foreignField': '_id',
                    'as': 'team_against'
                }
            },{
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'user_data'
                }
            }
        ])))
    for users_bet in this_users_bets:
        bets.append(users_bet)
    for follow in following:
        print(type(follow))
        following_id = ObjectId(follow)
        users_bets=bets_serializer_no_user(bets_collection.aggregate([
            {
                '$match': {
                    'user': following_id
                }
            },
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
                    'localField': 'team_against',
                    'foreignField': '_id',
                    'as': 'team_against'
                }
            },{
                '$lookup': {
                    'from': 'users',
                    'localField': 'user',
                    'foreignField': '_id',
                    'as': 'user_data'
                }
            }
        ]))
        for b in users_bets:
            bets.append(b)
    return {"status":"ok", "data":bets}

#Like post
@api_router.post("/like/{bet_id}")
async def like_post(bet_id):
    id = bet_id
    id_object = ObjectId(id)
    bets_collection.update_one({"_id":id_object},{"$inc" :{"likes":1}})
    return {"status":"ok","data":"ok"}

