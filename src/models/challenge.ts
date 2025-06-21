import { Post } from "./post";

interface Media {
  sm: string;
  original: string;
  thumb: string;
}

export interface Prize {
  rank: string;
  value: string;
}

export interface Sponsor {
  link: string | null;
  image: string | null;
  name: string;
  short_name: string;
}

export interface Challenge {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  end_date: string;
  days_left: number;
  media: Media[];
  prizes: Prize[];
  sponsors: Sponsor[];
  winners?: {
    description?: string;
    posts?: { post: Post; rank: string }[];
  };
  participants: { avatars: string[]; description: string };
}
