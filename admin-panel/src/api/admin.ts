import type { AppSetting, BarEntity, BarPayload, EventEntity, EventPayload } from "../types/api";

import { request } from "./client";

export const adminApi = {
  getSettings: () => request<AppSetting[]>("/admin/settings"),
  updateSetting: (key: string, payload: { value_ru: string; value_en: string }) =>
    request<AppSetting>(`/admin/settings/${key}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  getEvents: () => request<EventEntity[]>("/admin/events"),
  getEvent: (id: number) => request<EventEntity>(`/admin/events/${id}`),
  createEvent: (payload: EventPayload) =>
    request<EventEntity>("/admin/events", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateEvent: (id: number, payload: EventPayload) =>
    request<EventEntity>(`/admin/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteEvent: (id: number) =>
    request<void>(`/admin/events/${id}`, {
      method: "DELETE",
    }),
  getBarItems: () => request<BarEntity[]>("/admin/bar-items"),
  getBarItem: (id: number) => request<BarEntity>(`/admin/bar-items/${id}`),
  createBarItem: (payload: BarPayload) =>
    request<BarEntity>("/admin/bar-items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateBarItem: (id: number, payload: BarPayload) =>
    request<BarEntity>(`/admin/bar-items/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteBarItem: (id: number) =>
    request<void>(`/admin/bar-items/${id}`, {
      method: "DELETE",
    }),
};
