import collections
from pymongo import MongoClient
import certifi
ca = certifi.where()

#Database URL
url = "mongodb+srv://zach:andrews@cluster0.gddn1.mongodb.net/BetShare?retryWrites=true&w=majority"

#Connect to our databse using MongoClient
client = MongoClient(url, tlsCAFile=ca)

db = client.BetShare

users_collection = db["users"]
