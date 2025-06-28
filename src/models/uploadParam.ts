import { Collection } from "./collection";
import { Tag } from "./tag";

export interface UploadParam {
  id: number;
  img?: {
    tempPath?: string;
    previewUrl?: string;
    height?: number;
    width?: number;
    file?: File;
    loading: boolean;
    thumbnail?: File;
  };
  location?: {
    name?: string;
    long?: string;
    lat?: string;
  };
  title?: string;
  isLocked?: string;
  tags?: Tag[];
  collections?: Collection[];
  description?: string;
}
