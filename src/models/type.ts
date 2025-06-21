import { Option } from "./option";

export interface Type extends Option {
  id: number;
  name: string;
  key: string;
  search_placeholder?: string;
  count?: string;
  home_title_1: string;
  home_subtitle_1: string;
}
