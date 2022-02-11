from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
from uuid import UUID, uuid4

app = FastAPI()

origins = [
    "http://localhost:63342"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Sexo(str, Enum):
    femea = "femea"
    macho = "macho"


class Animal(BaseModel):
    id: Optional[UUID] = uuid4()
    nome: str
    idade: int
    sexo: Sexo
    cor: str


db: List[Animal] = [

]


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/animais")
async def printa_todos():
    return db


@app.get("/animais/{nome}")
async def printa_id_com_nome(animal_nome: str):
    for animal in db:
        if animal.nome == animal_nome:
            return {"message": f"O id desse animal eh {animal.id}"}


@app.get("/animais/{id}")
async def printa_nome_com_id(animal_id: UUID):
    for animal in db:
        if animal.id == animal_id:
            return {"message": f"O nome desse animal eh {animal.nome}"}


@app.post("/animais")
async def cadastra_animais(animal: Animal):
    db.append(animal)
    return {"id": animal.id}


@app.delete("/animais")
async def deleta_animal(animal_id: UUID):
    for animal in db:
        if animal.id == animal_id:
            db.remove(animal)
            return {f"O animal de nome {animal.nome} de id {animal.id} foi apagado"}
