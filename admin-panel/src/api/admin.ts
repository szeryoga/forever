import type { AppSetting, BarEntity, BarPayload, EventEntity, EventPayload } from "../types/api";

import { request } from "./client";

export const adminApi = {
  getSettings: () => request<AppSetting[]>("/api/admin/settings"),
  updateSetting: (key: string, payload: { value_ru: string; value_en: string }) =>
    request<AppSetting>(`/api/admin/settings/${key}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  getEvents: () => request<EventEntity[]>("/api/admin/events"),
  getEvent: (id: number) => request<EventEntity>(`/api/admin/events/${id}`),
  createEvent: (payload: EventPayload) =>
    request<EventEntity>("/api/admin/events", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateEvent: (id: number, payload: EventPayload) =>
    request<EventEntity>(`/api/admin/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteEvent: (id: number) =>
    request<void>(`/api/admin/events/${id}`, {
      method: "DELETE",
    }),
  getBarItems: () => request<BarEntity[]>("/api/admin/bar-items"),
  getBarItem: (id: number) => request<BarEntity>(`/api/admin/bar-items/${id}`),
  createBarItem: (payload: BarPayload) =>
    request<BarEntity>("/api/admin/bar-items", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateBarItem: (id: number, payload: BarPayload) =>
    request<BarEntity>(`/api/admin/bar-items/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteBarItem: (id: number) =>
    request<void>(`/api/admin/bar-items/${id}`, {
      method: "DELETE",
    }),
};
