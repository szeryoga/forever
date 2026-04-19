import type { BarItem, EventItem, ProfilePageData, PublicSettings } from "../types/api";

import { request } from "./client";

export const publicApi = {
  getSettings: () => request<PublicSettings>("/public/settings"),
  getEvents: () => request<EventItem[]>("/public/events"),
  getEvent: (eventId: number) => request<EventItem>(`/public/events/${eventId}`),
  getBarItems: () => request<BarItem[]>("/public/bar-items"),
  getProfilePage: () => request<ProfilePageData>("/public/profile-page"),
};
