import { Orientation } from "./orientation";
import { Sort } from "./sort";
import { Type } from "./type";

export interface Filter {
  types: Type[];
  orientations: Orientation[];
  colors: string[];
  sorting: Sort[];
}
