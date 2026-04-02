import { Link } from "react-router-dom";

import type { EventItem, Language } from "../types/api";
import { formatDateTime, pickLocalized } from "../utils";

export function EventsList({ items, language }: { items: EventItem[]; language: Language }) {
  return (
    <div className="event-list">
      {items.map((item) => (
        <Link key={item.id} to={`/events/${item.id}`} className="event-card">
          <img src={item.image_url} alt={pickLocalized(item, "title", language)} />
          <div className="event-card-body">
            <h2>{pickLocalized(item, "title", language)}</h2>
            <p className="event-meta">{formatDateTime(item.date_time, language)}</p>
            <p className="event-description">
              {pickLocalized(item, "short_description", language)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
