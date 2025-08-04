import { Post } from "./post";

export interface Author {
  id: number;
  display_name: string;
  username: string;
  bio: string;
  avatar: string;
  socialMedia?: [];
  posts?: Post[];
  available_for_hire?: boolean;
  is_followed?: boolean;
  followers_count?: number;
}
