import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { adminApi } from "../api/admin";
import { DataTable } from "../components/DataTable";
import { PageHeader } from "../components/PageHeader";
import { SettingsEditor } from "../components/SettingsEditor";
import type { AppSetting, BarEntity } from "../types/api";

export function BarListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<BarEntity[]>([]);
  const [setting, setSetting] = useState<AppSetting>();

  useEffect(() => {
    void Promise.all([adminApi.getBarItems(), adminApi.getSettings()]).then(([barItems, settings]) => {
      setItems(barItems);
      setSetting(settings.find((item) => item.key === "bar_page_title"));
    });
  }, []);

  return (
    <div>
      <PageHeader title="Bar" actionLabel="Create item" actionTo="/bar/new" />
      <SettingsEditor
        setting={setting}
        onSave={async (valueRu, valueEn) => {
          const updated = await adminApi.updateSetting("bar_page_title", {
            value_ru: valueRu,
            value_en: valueEn,
          });
          setSetting(updated);
        }}
      />
      <section className="panel">
        <DataTable
          rows={items}
          getRowKey={(item) => item.id}
          onRowClick={(item) => navigate(`/bar/${item.id}`)}
          columns={[
            { key: "id", header: "ID", render: (item) => item.id },
            { key: "title_ru", header: "Title RU", render: (item) => item.title_ru },
            { key: "title_en", header: "Title EN", render: (item) => item.title_en },
            { key: "category", header: "Category", render: (item) => item.category },
            { key: "price", header: "Price", render: (item) => `${item.price} ${item.currency}` },
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
