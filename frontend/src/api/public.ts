import type { BarItem, EventItem, ProfilePageData, PublicSettings } from "../types/api";

import { request } from "./client";

export const publicApi = {
  getSettings: () => request<PublicSettings>("/api/public/settings"),
  getEvents: () => request<EventItem[]>("/api/public/events"),
  getEvent: (eventId: number) => request<EventItem>(`/api/public/events/${eventId}`),
  getBarItems: () => request<BarItem[]>("/api/public/bar-items"),
  getProfilePage: () => request<ProfilePageData>("/api/public/profile-page"),
};
