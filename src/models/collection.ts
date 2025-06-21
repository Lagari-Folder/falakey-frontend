import { Option } from "./option";

export interface Collection extends Option {
  id: number;
  name: string;
  key: string;
}
