export type Language = "ru" | "en";

export interface SettingValue {
  ru: string;
  en: string;
}

export interface PublicSettings {
  events_page_title: SettingValue;
  bar_page_title: SettingValue;
  profile_page_title: SettingValue;
}

export interface EventItem {
  id: number;
  title_ru: string;
  title_en: string;
  short_description_ru: string;
  short_description_en: string;
  full_description_ru: string;
  full_description_en: string;
  image_url: string;
  date_time: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BarItem {
  id: number;
  title_ru: string;
  title_en: string;
  short_description_ru: string;
  short_description_en: string;
  price: string;
  currency: string;
  image_url: string;
  category: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProfilePageData {
  title: SettingValue;
  language_label_ru: string;
  language_label_en: string;
}

export interface TelegramUser {
  id?: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo_url?: string;
}
