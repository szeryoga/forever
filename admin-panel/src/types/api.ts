export interface AppSetting {
  id: number;
  key: string;
  value_ru: string;
  value_en: string;
  created_at: string;
  updated_at: string;
}

export interface EventPayload {
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
}

export interface EventEntity extends EventPayload {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface BarPayload {
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
}

export interface BarEntity extends BarPayload {
  id: number;
  created_at: string;
  updated_at: string;
}
