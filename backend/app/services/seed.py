from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.bar_item import BarItem
from app.models.event import Event
from app.services.settings_service import ensure_default_settings


def seed_data(db: Session) -> None:
    ensure_default_settings(db)

    if not db.scalars(select(Event.id)).first():
        db.add_all(
            [
                Event(
                    title_ru="Ночной Рейв",
                    title_en="Night Rave",
                    short_description_ru="Глубокий хаус, неон и диджей-сет до рассвета.",
                    short_description_en="Deep house, neon lights, and a DJ set until sunrise.",
                    full_description_ru=(
                        "Приготовься к ночи безумного драйва. Приходи на Ночной Рейв "
                        "в «Вечно Молодой». Тебя ждут лучшие диджеи, зажигательная "
                        "электронная музыка, мощный звук и клубная атмосфера."
                    ),
                    full_description_en=(
                        "Get ready for a night of pure energy. Join the Night Rave at "
                        "Forever Young for top DJs, explosive electronic music, powerful "
                        "sound, and a true late-night club atmosphere."
                    ),
                    image_url="https://images.unsplash.com/photo-1571266028243-d220c9f0f5b9?auto=format&fit=crop&w=1200&q=80",
                    date_time=datetime(2026, 5, 27, 23, 0, 0),
                    is_published=True,
                    sort_order=1,
                ),
                Event(
                    title_ru="Коктейльная Вечеринка",
                    title_en="Cocktail Party",
                    short_description_ru="Авторские коктейли и медленный грув в барном зале.",
                    short_description_en="Signature cocktails and slow groove in the bar hall.",
                    full_description_ru=(
                        "Открой для себя вечер фирменных миксов, барных историй и живого "
                        "общения. Команда бара подготовила специальное меню и музыкальный сет."
                    ),
                    full_description_en=(
                        "Discover an evening of signature mixes, bar stories, and lively "
                        "conversation. The bar team prepared a special menu and music set."
                    ),
                    image_url="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
                    date_time=datetime(2026, 5, 28, 20, 0, 0),
                    is_published=True,
                    sort_order=2,
                ),
                Event(
                    title_ru="Рок-Концерт",
                    title_en="Rock Concert",
                    short_description_ru="Живой звук, плотный свет и резкий гитарный сет.",
                    short_description_en="Live sound, dense lighting, and a sharp guitar-driven set.",
                    full_description_ru=(
                        "Громкий вечер с живой группой, плотным басом и атмосферой "
                        "камерного концерта. Бери друзей и приходи пораньше."
                    ),
                    full_description_en=(
                        "A loud evening with a live band, thick bass, and the atmosphere "
                        "of an intimate concert. Bring friends and come early."
                    ),
                    image_url="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
                    date_time=datetime(2026, 5, 29, 21, 0, 0),
                    is_published=True,
                    sort_order=3,
                ),
            ]
        )

    if not db.scalars(select(BarItem.id)).first():
        db.add_all(
            [
                BarItem(
                    title_ru="Пельмени",
                    title_en="Pelmeni",
                    short_description_ru="Классические пельмени со сметаной.",
                    short_description_en="Classic dumplings served with sour cream.",
                    price=2200,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80",
                    category="food",
                    is_published=True,
                    sort_order=1,
                ),
                BarItem(
                    title_ru="Вареники",
                    title_en="Vareniki",
                    short_description_ru="Нежные вареники с картофелем и луком.",
                    short_description_en="Soft dumplings with potato and onion filling.",
                    price=1900,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
                    category="food",
                    is_published=True,
                    sort_order=2,
                ),
                BarItem(
                    title_ru="Торт Наполеон",
                    title_en="Napoleon Cake",
                    short_description_ru="Слоеный десерт с ванильным кремом.",
                    short_description_en="Layered dessert with vanilla cream.",
                    price=1800,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
                    category="food",
                    is_published=True,
                    sort_order=3,
                ),
                BarItem(
                    title_ru="Медовик",
                    title_en="Honey Cake",
                    short_description_ru="Медовые коржи с легким кремом.",
                    short_description_en="Honey layers with a light cream filling.",
                    price=1600,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80",
                    category="food",
                    is_published=True,
                    sort_order=4,
                ),
                BarItem(
                    title_ru="Неоновый Спритц",
                    title_en="Neon Spritz",
                    short_description_ru="Цитрус, биттер и игристое с яркой подачей.",
                    short_description_en="Citrus, bitter, and sparkling wine with a vivid serve.",
                    price=950,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
                    category="drink",
                    is_published=True,
                    sort_order=5,
                ),
                BarItem(
                    title_ru="Вишневый Хайбол",
                    title_en="Cherry Highball",
                    short_description_ru="Освежающий микс с вишней и содовой.",
                    short_description_en="Refreshing mix with cherry and soda.",
                    price=870,
                    currency="RUB",
                    image_url="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
                    category="drink",
                    is_published=True,
                    sort_order=6,
                ),
            ]
        )

    db.commit()
