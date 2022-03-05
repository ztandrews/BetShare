from fastapi import FastAPI
from routes.routes import api_router

#Initializes a FastAPI app
app = FastAPI()

#Get the routes from routers.py
app.include_router(api_router)