import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import OperationalError

from app.api.admin import router as admin_router
from app.api.public import router as public_router
from app.core.config import get_settings
from app.db.base import AppSetting, BarItem, Event  # noqa: F401
from app.db.session import SessionLocal, Base, engine
from app.services.seed import seed_data

settings = get_settings()
app = FastAPI(title=settings.app_name, debug=settings.debug)
DB_INIT_LOCK_ID = 22042026

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(public_router, prefix=settings.api_prefix)
app.include_router(admin_router, prefix=settings.api_prefix)


def wait_for_db(max_attempts: int = 30, delay_seconds: int = 2) -> None:
    for attempt in range(1, max_attempts + 1):
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            return
        except OperationalError:
            if attempt == max_attempts:
                raise
            time.sleep(delay_seconds)


def initialize_database() -> None:
    with engine.connect() as connection:
        connection.execute(text("SELECT pg_advisory_lock(:lock_id)"), {"lock_id": DB_INIT_LOCK_ID})
        try:
            Base.metadata.create_all(bind=engine)
            with SessionLocal() as session:
                seed_data(session)
        finally:
            connection.execute(text("SELECT pg_advisory_unlock(:lock_id)"), {"lock_id": DB_INIT_LOCK_ID})


@app.on_event("startup")
def on_startup() -> None:
    wait_for_db()
    initialize_database()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
