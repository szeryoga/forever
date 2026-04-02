from pydantic import BaseModel

from app.schemas.common import TimestampedSchema


class AppSettingBase(BaseModel):
    key: str
    value_ru: str
    value_en: str


class AppSettingUpdate(BaseModel):
    value_ru: str
    value_en: str


class AppSettingRead(AppSettingBase, TimestampedSchema):
    id: int


class PublicSettingsResponse(BaseModel):
    events_page_title: dict[str, str]
    bar_page_title: dict[str, str]
    profile_page_title: dict[str, str]
