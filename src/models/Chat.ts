import { Message } from "./Message";
import { Post } from "./post";
import { User } from "./user";

export interface Chat {
  id: number;
  post: Post | null;
  peer: User;
  
  last_message: Message;
}
