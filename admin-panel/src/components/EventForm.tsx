import { useEffect, useState } from "react";

import type { EventPayload } from "../types/api";

interface EventFormProps {
  initialValue: EventPayload;
  onSubmit: (value: EventPayload) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function EventForm({ initialValue, onSubmit, onDelete }: EventFormProps) {
  const [form, setForm] = useState<EventPayload>(initialValue);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialValue);
  }, [initialValue]);

  function update<K extends keyof EventPayload>(key: K, value: EventPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <form
      className="panel form-panel"
      onSubmit={async (event) => {
        event.preventDefault();
        setSaving(true);
        try {
          await onSubmit(form);
        } finally {
          setSaving(false);
        }
      }}
    >
      <div className="field-grid">
        <label>
          <span>Title RU</span>
          <input value={form.title_ru} onChange={(e) => update("title_ru", e.target.value)} />
        </label>
        <label>
          <span>Title EN</span>
          <input value={form.title_en} onChange={(e) => update("title_en", e.target.value)} />
        </label>
        <label>
          <span>Date and time</span>
          <input
            type="datetime-local"
            value={form.date_time}
            onChange={(e) => update("date_time", e.target.value)}
          />
        </label>
        <label>
          <span>Image URL</span>
          <input value={form.image_url} onChange={(e) => update("image_url", e.target.value)} />
        </label>
        <label>
          <span>Short description RU</span>
          <textarea
            value={form.short_description_ru}
            onChange={(e) => update("short_description_ru", e.target.value)}
          />
        </label>
        <label>
          <span>Short description EN</span>
          <textarea
            value={form.short_description_en}
            onChange={(e) => update("short_description_en", e.target.value)}
          />
        </label>
        <label>
          <span>Full description RU</span>
          <textarea
            rows={5}
            value={form.full_description_ru}
            onChange={(e) => update("full_description_ru", e.target.value)}
          />
        </label>
        <label>
          <span>Full description EN</span>
          <textarea
            rows={5}
            value={form.full_description_en}
            onChange={(e) => update("full_description_en", e.target.value)}
          />
        </label>
        <label>
          <span>Sort order</span>
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update("sort_order", Number(e.target.value))}
          />
        </label>
        <label className="checkbox-field">
          <span>Published</span>
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => update("is_published", e.target.checked)}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={saving}>
          {saving ? "Saving..." : "Save event"}
        </button>
        {onDelete ? (
          <button
            type="button"
            className="danger-button"
            onClick={() => {
              void onDelete();
            }}
          >
            Delete
          </button>
        ) : null}
      </div>
    </form>
  );
}
