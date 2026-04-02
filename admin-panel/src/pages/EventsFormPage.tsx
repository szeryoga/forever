import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { adminApi } from "../api/admin";
import { EventForm } from "../components/EventForm";
import { PageHeader } from "../components/PageHeader";
import type { EventPayload } from "../types/api";

const emptyEvent: EventPayload = {
  title_ru: "",
  title_en: "",
  short_description_ru: "",
  short_description_en: "",
  full_description_ru: "",
  full_description_en: "",
  image_url: "",
  date_time: "2026-05-27T23:00",
  is_published: true,
  sort_order: 0,
};

export function EventsFormPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState<EventPayload>(emptyEvent);
  const isNew = !eventId;

  useEffect(() => {
    if (!eventId) {
      setEvent(emptyEvent);
      return;
    }
    void adminApi.getEvent(Number(eventId)).then((data) =>
      setEvent({
        ...data,
        date_time: data.date_time.slice(0, 16),
      }),
    );
  }, [eventId]);

  return (
    <div>
      <PageHeader title={isNew ? "Create Event" : `Edit Event #${eventId}`} />
      <EventForm
        initialValue={event}
        onSubmit={async (value) => {
          if (isNew) {
            const created = await adminApi.createEvent(value);
            navigate(`/events/${created.id}`);
            return;
          }
          await adminApi.updateEvent(Number(eventId), value);
        }}
        onDelete={
          isNew
            ? undefined
            : async () => {
                await adminApi.deleteEvent(Number(eventId));
                navigate("/events");
              }
        }
      />
    </div>
  );
}
