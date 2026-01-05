import uvicorn
from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
import strawberry
from strawberry.fastapi import GraphQLRouter
from config import db


def init_app():
  app = FastAPI(title="FactFlow GraphQL API")

  # # on_event is deprecated, use lifespan instead
  # @app.on_event("startup")
  # async def startup():
  #   await db.create_all()
  # @app.on_event("shutdown")
  # async def shutdown():
  #   await db.close()
  @asynccontextmanager
  async def lifespan(app: FastAPI):
      await db.create_all()
      yield
      await db.close()


  @app.get('/')
  def home():
    return {"msg": "welcome home"}
  
  return app


app = init_app()

if __name__ == '__main__':
  uvicorn.run(app="main:app", host="localhost", port=8000, reload=True)

