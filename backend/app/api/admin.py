from fastapi import APIRouter, HTTPException, Response, status
from sqlalchemy import select

from app.api.deps import DBSession
from app.models.bar_item import BarItem
from app.models.event import Event
from app.models.setting import AppSetting
from app.schemas.bar_item import BarItemCreate, BarItemRead, BarItemUpdate
from app.schemas.event import EventCreate, EventRead, EventUpdate
from app.schemas.setting import AppSettingRead, AppSettingUpdate
from app.services.settings_service import ensure_default_settings

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/settings", response_model=list[AppSettingRead])
def get_admin_settings(db: DBSession) -> list[AppSettingRead]:
    ensure_default_settings(db)
    return list(db.scalars(select(AppSetting).order_by(AppSetting.id.asc())).all())


@router.put("/settings/{key}", response_model=AppSettingRead)
def update_setting(key: str, payload: AppSettingUpdate, db: DBSession) -> AppSettingRead:
    ensure_default_settings(db)
    setting = db.scalar(select(AppSetting).where(AppSetting.key == key))
    if not setting:
        raise HTTPException(status_code=404, detail="Setting not found")
    setting.value_ru = payload.value_ru
    setting.value_en = payload.value_en
    db.commit()
    db.refresh(setting)
    return setting


@router.get("/events", response_model=list[EventRead])
def get_admin_events(db: DBSession) -> list[EventRead]:
    return list(db.scalars(select(Event).order_by(Event.sort_order.asc(), Event.id.asc())).all())


@router.post("/events", response_model=EventRead, status_code=status.HTTP_201_CREATED)
def create_event(payload: EventCreate, db: DBSession) -> EventRead:
    event = Event(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@router.get("/events/{event_id}", response_model=EventRead)
def get_admin_event(event_id: int, db: DBSession) -> EventRead:
    event = db.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.put("/events/{event_id}", response_model=EventRead)
def update_event(event_id: int, payload: EventUpdate, db: DBSession) -> EventRead:
    event = db.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for field, value in payload.model_dump().items():
        setattr(event, field, value)
    db.commit()
    db.refresh(event)
    return event


@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int, db: DBSession) -> Response:
    event = db.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(event)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/bar-items", response_model=list[BarItemRead])
def get_admin_bar_items(db: DBSession) -> list[BarItemRead]:
    return list(db.scalars(select(BarItem).order_by(BarItem.sort_order.asc(), BarItem.id.asc())).all())


@router.post("/bar-items", response_model=BarItemRead, status_code=status.HTTP_201_CREATED)
def create_bar_item(payload: BarItemCreate, db: DBSession) -> BarItemRead:
    item = BarItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.get("/bar-items/{item_id}", response_model=BarItemRead)
def get_admin_bar_item(item_id: int, db: DBSession) -> BarItemRead:
    item = db.get(BarItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Bar item not found")
    return item


@router.put("/bar-items/{item_id}", response_model=BarItemRead)
def update_bar_item(item_id: int, payload: BarItemUpdate, db: DBSession) -> BarItemRead:
    item = db.get(BarItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Bar item not found")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/bar-items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_bar_item(item_id: int, db: DBSession) -> Response:
    item = db.get(BarItem, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Bar item not found")
    db.delete(item)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
