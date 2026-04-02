from sqlalchemy import Boolean, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.session import Base
from app.models.mixins import TimestampMixin


class BarItem(TimestampMixin, Base):
    __tablename__ = "bar_items"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title_ru: Mapped[str] = mapped_column(String(255))
    title_en: Mapped[str] = mapped_column(String(255))
    short_description_ru: Mapped[str] = mapped_column(Text())
    short_description_en: Mapped[str] = mapped_column(Text())
    price: Mapped[float] = mapped_column(Numeric(10, 2))
    currency: Mapped[str] = mapped_column(String(10), default="RUB")
    image_url: Mapped[str] = mapped_column(String(500))
    category: Mapped[str] = mapped_column(String(50))
    is_published: Mapped[bool] = mapped_column(Boolean(), default=True, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer(), default=0, nullable=False)
