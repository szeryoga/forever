import { useParams } from "react-router-dom";

import { publicApi } from "../api/public";
import { useLanguage } from "../context/LanguageContext";
import { useAsyncData } from "../hooks/useAsyncData";
import { formatDateTime, pickLocalized } from "../utils";

export function EventDetailsPage() {
  const { eventId } = useParams();
  const { language } = useLanguage();
  const id = Number(eventId);
  const { data: event, loading, error } = useAsyncData(() => publicApi.getEvent(id), [id]);

  if (loading) {
    return <p className="info-message">Loading event...</p>;
  }

  if (error || !event) {
    return <p className="info-message error">{error ?? "Event not found"}</p>;
  }

  return (
    <section className="event-details-page">
      <div className="event-hero">
        <img src={event.image_url} alt={pickLocalized(event, "title", language)} />
      </div>
      <div className="event-details-card">
        <h1>{pickLocalized(event, "title", language)}</h1>
        <p className="event-meta">{formatDateTime(event.date_time, language)}</p>
        <p className="event-full-description">
          {pickLocalized(event, "full_description", language)}
        </p>
      </div>
    </section>
  );
}
