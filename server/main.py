import uvicorn
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
import strawberry
from strawberry.fastapi import GraphQLRouter
from server.database import create_db_and_tables, close_db


def init_app():
  @asynccontextmanager
  async def lifespan(app: FastAPI):
      await create_db_and_tables()
      yield
      await close_db()

  app = FastAPI(
     title="FactFlow GraphQL API",
     lifespan=lifespan
  )

  @app.get('/')
  def home():
    return {"msg": "welcome home"}
  
  return app

app = init_app()

if __name__ == '__main__':
  uvicorn.run(app="main:app", host="localhost", port=8000, reload=True)

