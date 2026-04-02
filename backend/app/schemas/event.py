from datetime import datetime

from pydantic import BaseModel

from app.schemas.common import TimestampedSchema


class EventBase(BaseModel):
    title_ru: str
    title_en: str
    short_description_ru: str
    short_description_en: str
    full_description_ru: str
    full_description_en: str
    image_url: str
    date_time: datetime
    is_published: bool = True
    sort_order: int = 0


class EventCreate(EventBase):
    pass


class EventUpdate(EventBase):
    pass


class EventRead(EventBase, TimestampedSchema):
    id: int
