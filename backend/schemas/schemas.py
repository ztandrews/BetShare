from bson import ObjectId
from bson.json_util import dumps, CANONICAL_JSON_OPTIONS, loads
#How we present our data in FastAPI

#How users will be presented
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

#How bets will be presented
def bet_serializer(bet) -> dict:
    user_dict = bet["user"][0]
    team_for_dict = bet["team_for"][0]
    team_against_dict = bet["team_against"][0]

    return{
        "id":str(bet["_id"]),

        #YESSSSSSS DO IT LIKE THIS !!!!!! YESSSSSSSSSSSSSSSSSSSSS OMG
        "user":{"id":str(user_dict["_id"]),"username":user_dict["username"], "name":user_dict["name"],
        "wins":user_dict["wins"],"losses":user_dict["losses"]},

        "team_for":{"id":str(team_for_dict["_id"]),"city":team_for_dict["city"],"team":team_for_dict["team"],
        "abv":team_for_dict["abv"],"league":team_for_dict["league"]},

        "team_against":{"id":str(team_against_dict["_id"]),"city":team_against_dict["city"],"team":team_against_dict["team"],
        "abv":team_against_dict["abv"],"league":team_against_dict["league"]},

        "amount":bet["amount"],
        "odds":bet["odds"],
        "details":bet["details"],
        "outcome":bet["outcome"],
        "likes":bet["likes"],

    }

def bets_serializer(bets) -> list:
    return [bet_serializer(bet) for bet in bets]

#How teams will be presented
def team_searializer(team) -> dict:
    return{
        "id":str(team["_id"]),
        "city":team["city"],
        "team":team["team"],
        "abv":team["abv"],
        "league":team["league"]
    }

def teams_searializer(teams) -> list:
    return [team_searializer(team) for team in teams]

def bet_serializer_no_user(bet) -> dict:
    team_for_dict = bet["team_for"][0]
    team_against_dict = bet["team_against"][0]

    return{
        "id":str(bet["_id"]),
        "user":str(bet["user"]),
        "team_for":{"id":str(team_for_dict["_id"]),"city":team_for_dict["city"],"team":team_for_dict["team"],
        "abv":team_for_dict["abv"],"league":team_for_dict["league"]},
        "team_against":{"id":str(team_against_dict["_id"]),"city":team_against_dict["city"],"team":team_against_dict["team"],
        "abv":team_against_dict["abv"],"league":team_against_dict["league"]},
        "amount":bet["amount"],
        "odds":bet["odds"],
        "details":bet["details"],
        "outcome":bet["outcome"],
        "likes":bet["likes"],
    }

def bets_serializer_no_user(bets) -> list:
    return [bet_serializer_no_user(bet) for bet in bets]