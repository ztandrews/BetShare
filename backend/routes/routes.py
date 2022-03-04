from fastapi import APIRouter
from config.database import users_collection
from models.models import User
from schemas.schemas import user_serializer, users_serializer

user_api_router = APIRouter()

# get
@user_api_router.get("/")
async def get_users():
    users = users_serializer(users_collection.find())
    return {"status":"ok", "data":users}