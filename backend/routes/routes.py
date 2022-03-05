from fastapi import APIRouter
from config.database import users_collection
from models.models import User
from schemas.schemas import user_serializer, users_serializer

api_router = APIRouter()

#Greeting message
@api_router.get("/")
async def welcome():
    return {"message":"Welcome to the BetShare API"}


@api_router.get("/users")
async def get_users():
    users = users_serializer(users_collection.find())
    return {"status":"ok", "data":users}
