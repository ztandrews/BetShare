#How we present our data in FastAPI

def user_serializer(user) -> dict:
    return{
        "id":str(user["_id"]),
        "name":user["name"],
        "email":user["email"],
        "password":user["password"],
        "losses":user["losses"],
        "username":user["username"],
        "wins":user["wins"]
    }

def users_serializer(users) -> list:
    return [user_serializer(user) for user in users]