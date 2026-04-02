import { useEffect, useState } from "react";

import type { BarPayload } from "../types/api";

interface BarItemFormProps {
  initialValue: BarPayload;
  onSubmit: (value: BarPayload) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export function BarItemForm({ initialValue, onSubmit, onDelete }: BarItemFormProps) {
  const [form, setForm] = useState<BarPayload>(initialValue);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(initialValue);
  }, [initialValue]);

  function update<K extends keyof BarPayload>(key: K, value: BarPayload[K]) {
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
          <span>Price</span>
          <input value={form.price} onChange={(e) => update("price", e.target.value)} />
        </label>
        <label>
          <span>Currency</span>
          <input value={form.currency} onChange={(e) => update("currency", e.target.value)} />
        </label>
        <label>
          <span>Image URL</span>
          <input value={form.image_url} onChange={(e) => update("image_url", e.target.value)} />
        </label>
        <label>
          <span>Category</span>
          <select value={form.category} onChange={(e) => update("category", e.target.value)}>
            <option value="food">food</option>
            <option value="drink">drink</option>
          </select>
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
          {saving ? "Saving..." : "Save item"}
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
