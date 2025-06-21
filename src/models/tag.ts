import { Option } from "./option";

export interface Tag extends Option {
  id: number;
  name: string;
  key: string;
}
