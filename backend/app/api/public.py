from fastapi import APIRouter, HTTPException
from sqlalchemy import select

from app.api.deps import DBSession
from app.models.bar_item import BarItem
from app.models.event import Event
from app.schemas.bar_item import BarItemRead
from app.schemas.event import EventRead
from app.schemas.profile import ProfilePageResponse
from app.schemas.setting import PublicSettingsResponse
from app.services.settings_service import public_settings_payload

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/settings", response_model=PublicSettingsResponse)
def get_public_settings(db: DBSession) -> PublicSettingsResponse:
    return PublicSettingsResponse(**public_settings_payload(db))


@router.get("/events", response_model=list[EventRead])
def get_public_events(db: DBSession) -> list[EventRead]:
    statement = (
        select(Event)
        .where(Event.is_published.is_(True))
        .order_by(Event.sort_order.asc(), Event.date_time.asc(), Event.id.asc())
    )
    return list(db.scalars(statement).all())


@router.get("/events/{event_id}", response_model=EventRead)
def get_public_event(event_id: int, db: DBSession) -> EventRead:
    event = db.get(Event, event_id)
    if not event or not event.is_published:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.get("/bar-items", response_model=list[BarItemRead])
def get_public_bar_items(db: DBSession) -> list[BarItemRead]:
    statement = (
        select(BarItem)
        .where(BarItem.is_published.is_(True))
        .order_by(BarItem.sort_order.asc(), BarItem.id.asc())
    )
    return list(db.scalars(statement).all())


@router.get("/profile-page", response_model=ProfilePageResponse)
def get_profile_page(db: DBSession) -> ProfilePageResponse:
    settings = public_settings_payload(db)
    return ProfilePageResponse(
        title=settings["profile_page_title"],
        language_label_ru="Русский",
        language_label_en="English",
    )
