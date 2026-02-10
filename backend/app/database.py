import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.config import settings

# Engine and session are None until init_db() is called
engine = None
AsyncSessionLocal = None

def init_db():
    """Call this when ready to connect to the real database."""
    global engine, AsyncSessionLocal
    engine = create_async_engine(
        settings.DATABASE_URL,
        pool_size=20,
        max_overflow=10,
        pool_pre_ping=True,
        pool_recycle=3600,
    )
    AsyncSessionLocal = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )
    print("Database connection initialized.")

async def get_db():
    """Dependency for FastAPI routes. Returns None if DB not initialized."""
    if AsyncSessionLocal is None:
        yield None
        return
    async with AsyncSessionLocal() as session:
        yield session
