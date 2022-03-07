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


def bet_serializer(bet) -> dict:
    return{
        "id":str(bet["_id"]),
        "user":str(bet["user"]),
        "team_for":str(bet["team_for"]),
        "team_against":str(bet["team_agaisnt"]),
        "amount":bet["amount"],
        "odds":bet["odds"],
        "outcome":bet["outcome"],
        "likes":bet["likes"],
        "date":bet["date"],
        "comments":str(bet["comments"])

    }

def bets_serializer(bets) -> list:
    return [bet_serializer(bet) for bet in bets]