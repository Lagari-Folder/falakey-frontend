import { Author } from "./author";
import { Collection } from "./collection";
import { Media } from "./media";
import { Tag } from "./tag";

export interface Post {
  id: number;
  title: string;
  slug: string;
  credits?: number;
  description?: string;
  location?: string;
  location_lat?: string;
  location_lng?: string;
  author?: Author;
  type?: string;
  tags?: Tag[];
  collections?: Collection[];
  thumbnail_url?: string;
  downloads_count?: string;
  views_count?: string;
  download_data?: {
    label: string;
    dimensions: string;
    link: string;
    extension?: string;
  }[];
  dominant_color?: string;
  preview_links?: Media;
  aspect_ratio?: number;
  is_favorite?: boolean;
  is_download_locked?: boolean;
  is_premium?: boolean;
  favorites_count: number;
  created_at?: string;
  status?: { key: string; color: string };
}
