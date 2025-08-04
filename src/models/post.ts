import { Author } from "./author";
import { Collection } from "./collection";
import { Media } from "./media";
import { Tag } from "./tag";

export interface Post {
  id: number;
  title: string;
  slug: string;
  premium_credits?: number;
  description?: string;
  location?: string;
  location_lat?: string;
  location_lng?: string;
  author?: Author;
  type?: string;
  tags?: Tag[];
  collections?: Collection[];
  thumbnails?: Media;
  downloads_count?: string;
  views_count?: string;
  download_data?: DownloadData[];
  dominant_color?: string;
  preview_links?: Media;
  aspect_ratio?: number;
  is_favorite?: boolean;
  is_download_locked?: boolean;
  is_premium?: boolean;
  is_purchased?: boolean;
  favorites_count: number;
  created_at?: string;
  seo_keywords?: string[];
  status?: { key: string; color: string };
}

export interface DownloadData {
  label: string;
  dimensions: string;
  link: string;
  extension?: string;
}
