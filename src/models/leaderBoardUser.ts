import { Post } from "./post";
import { User } from "./user";

export interface LeaderBoardUser {
  rank?: number;
  author?: User;
  total_views?: number;
  total_views_display?: string;
  total_posts?: number;
  total_posts_display?: string;
  latest_posts?: Post[];
}
