import { useEffect, useState } from "react";

import type { AppSetting } from "../types/api";

interface SettingsEditorProps {
  setting?: AppSetting;
  onSave: (valueRu: string, valueEn: string) => Promise<void>;
}

export function SettingsEditor({ setting, onSave }: SettingsEditorProps) {
  const [valueRu, setValueRu] = useState("");
  const [valueEn, setValueEn] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setValueRu(setting?.value_ru ?? "");
    setValueEn(setting?.value_en ?? "");
  }, [setting]);

  if (!setting) {
    return null;
  }

  return (
    <section className="panel">
      <div className="field-grid">
        <label>
          <span>Title RU</span>
          <input value={valueRu} onChange={(event) => setValueRu(event.target.value)} />
        </label>
        <label>
          <span>Title EN</span>
          <input value={valueEn} onChange={(event) => setValueEn(event.target.value)} />
        </label>
      </div>
      <div className="form-actions">
        <button
          type="button"
          className="primary-button"
          disabled={saving}
          onClick={async () => {
            setSaving(true);
            try {
              await onSave(valueRu, valueEn);
            } finally {
              setSaving(false);
            }
          }}
        >
          {saving ? "Saving..." : "Save title"}
        </button>
      </div>
    </section>
  );
}
