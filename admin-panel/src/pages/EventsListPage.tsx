import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminApi } from "../api/admin";
import { DataTable } from "../components/DataTable";
import { PageHeader } from "../components/PageHeader";
import { SettingsEditor } from "../components/SettingsEditor";
import type { AppSetting, EventEntity } from "../types/api";

export function EventsListPage() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventEntity[]>([]);
  const [setting, setSetting] = useState<AppSetting>();

  useEffect(() => {
    void Promise.all([adminApi.getEvents(), adminApi.getSettings()]).then(([eventsData, settings]) => {
      setEvents(eventsData);
      setSetting(settings.find((item) => item.key === "events_page_title"));
    });
  }, []);

  return (
    <div>
      <PageHeader title="Events" actionLabel="Create event" actionTo="/events/new" />
      <SettingsEditor
        setting={setting}
        onSave={async (valueRu, valueEn) => {
          const updated = await adminApi.updateSetting("events_page_title", {
            value_ru: valueRu,
            value_en: valueEn,
          });
          setSetting(updated);
        }}
      />
      <section className="panel">
        <DataTable
          rows={events}
          getRowKey={(item) => item.id}
          onRowClick={(item) => navigate(`/events/${item.id}`)}
          columns={[
            { key: "id", header: "ID", render: (item) => item.id },
            { key: "title_ru", header: "Title RU", render: (item) => item.title_ru },
            { key: "title_en", header: "Title EN", render: (item) => item.title_en },
            { key: "date_time", header: "Date", render: (item) => item.date_time.replace("T", " ") },
            {
              key: "short_description_ru",
              header: "Short RU",
              render: (item) => item.short_description_ru,
            },
            {
              key: "is_published",
              header: "Published",
              render: (item) => (item.is_published ? "Yes" : "No"),
            },
          ]}
        />
      </section>
    </div>
  );
}
