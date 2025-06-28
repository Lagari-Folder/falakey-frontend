export interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  country_code?: string;
  phone?: string;
  email?: string;
  username?: string;
  social_media?: { value: string; platform: string }[];
  bio?: string;
  available_for_hire?: boolean;
  avatar?: string;
  cover?: string;
  followers_count?: number;
  following_count?: number;
  is_followed?: boolean;
  credits?: number;
}
