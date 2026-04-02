from pydantic import BaseModel


class ProfilePageResponse(BaseModel):
    title: dict[str, str]
    language_label_ru: str
    language_label_en: str
