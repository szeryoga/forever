from decimal import Decimal

from pydantic import BaseModel

from app.schemas.common import TimestampedSchema


class BarItemBase(BaseModel):
    title_ru: str
    title_en: str
    short_description_ru: str
    short_description_en: str
    price: Decimal
    currency: str
    image_url: str
    category: str
    is_published: bool = True
    sort_order: int = 0


class BarItemCreate(BarItemBase):
    pass


class BarItemUpdate(BarItemBase):
    pass


class BarItemRead(BarItemBase, TimestampedSchema):
    id: int
