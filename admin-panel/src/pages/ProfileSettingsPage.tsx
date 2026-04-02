import { useEffect, useState } from "react";

import { adminApi } from "../api/admin";
import { PageHeader } from "../components/PageHeader";
import { SettingsEditor } from "../components/SettingsEditor";
import type { AppSetting } from "../types/api";

export function ProfileSettingsPage() {
  const [setting, setSetting] = useState<AppSetting>();

  useEffect(() => {
    void adminApi.getSettings().then((settings) => {
      setSetting(settings.find((item) => item.key === "profile_page_title"));
    });
  }, []);

  return (
    <div>
      <PageHeader title="Profile" />
      <SettingsEditor
        setting={setting}
        onSave={async (valueRu, valueEn) => {
          const updated = await adminApi.updateSetting("profile_page_title", {
            value_ru: valueRu,
            value_en: valueEn,
          });
          setSetting(updated);
        }}
      />
    </div>
  );
}
