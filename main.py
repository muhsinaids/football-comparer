import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_FOOTBALL_KEY")
BASE_URL = "https://v3.football.api-sports.io"

@app.get("/search")
def search_player(player: str):
    headers = {"x-apisports-key": API_KEY}
    params = {"search": player}
    response = requests.get(f"{BASE_URL}/players/profiles",headers=headers, params=params)
    return response.json()

@app.get("/stats")
def player_stats(player_id: int, season: int=2023):
    headers = {"x-apisports-key": API_KEY}
    params = {"id":player_id, "season":season}
    response = requests.get(f"{BASE_URL}/players", headers=headers, params=params)
    return response.json()