from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base
from app.models.mixins import TimestampMixin


class Event(TimestampMixin, Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title_ru: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    short_description_ru: Mapped[str] = mapped_column(Text())
    short_description_en: Mapped[str] = mapped_column(Text())
    full_description_ru: Mapped[str] = mapped_column(Text())
    full_description_en: Mapped[str] = mapped_column(Text())
    image_url: Mapped[str] = mapped_column(String(500))
    date_time: Mapped[datetime] = mapped_column(DateTime(timezone=False))
    is_published: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer(), default=0, nullable=False)
