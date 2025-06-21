import { User } from "./user";

export interface Message {
  id: number;
  sender: User;
  is_read: boolean;
  message: string;
  created_at: string;
}
