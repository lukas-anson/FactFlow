import os
from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from server.model.model import Base
from typing import AsyncGenerator

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create session factory
SessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Dependency for FastAPI
async def get_session() -> AsyncGenerator[AsyncSession, None]:
    # this yield pauses inside the context manager, allowing other files
    # to use this session while still being managed by the context manager
    async with SessionLocal() as session:
        yield session

# Utility functions for database initialization
async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def drop_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

async def close_db():
    await engine.dispose()
