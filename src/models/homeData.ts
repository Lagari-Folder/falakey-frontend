import { Collection } from "./collection";
import { LeaderBoardUser } from "./leaderBoardUser";
import { Type } from "./type";

export interface HomeData {
  logo: {
    light?: string;
    dark?: string;
  };
  collections: Collection[];
  types: Type[];
  banner: {
    image?: string;
    author: {
      display_name?: string;
      username?: string;
    };
    position?: string;
  };
  leaderboard: LeaderBoardUser[];
}
