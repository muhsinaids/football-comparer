import os
import requests
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app=FastAPI()

API_KEY = os.getenv("API_FOOTBALL_KEY")
BASE_URL = "https://v3.football.api-sports.io"

@app.get("/search")
def search_player(player: str):
    headers = {"x-apisports-key": API_KEY}
    params = {"search": player}
    response = requests.get(f"{BASE_URL}/players/profiles",headers=headers, params=params)
    return response.json()