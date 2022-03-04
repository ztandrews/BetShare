from fastapi import FastAPI
from routes.routes import user_api_router

#Initializes a FastAPI app
app = FastAPI()

#Get the routes from routers.py
app.include_router(user_api_router)