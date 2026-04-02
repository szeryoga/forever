from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.setting import AppSetting

DEFAULT_SETTINGS: dict[str, tuple[str, str]] = {
    "events_page_title": ("События этой недели", "Events this week"),
    "bar_page_title": ("Блюда русской кухни", "Russian cuisine dishes"),
    "profile_page_title": ("Твой профиль", "Your profile"),
}


def get_settings_map(db: Session) -> dict[str, AppSetting]:
    settings = db.scalars(select(AppSetting)).all()
    return {item.key: item for item in settings}


def ensure_default_settings(db: Session) -> None:
    existing = get_settings_map(db)
    changed = False
    for key, (value_ru, value_en) in DEFAULT_SETTINGS.items():
        if key not in existing:
            db.add(AppSetting(key=key, value_ru=value_ru, value_en=value_en))
            changed = True
    if changed:
        db.commit()


def public_settings_payload(db: Session) -> dict[str, dict[str, str]]:
    ensure_default_settings(db)
    settings = get_settings_map(db)
    return {
        key: {"ru": item.value_ru, "en": item.value_en}
        for key, item in settings.items()
        if key in DEFAULT_SETTINGS
    }
