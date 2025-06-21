import { RootState } from "@/lib/store";
import { LeaderBoardUser } from "@/models/leaderBoardUser";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useLeaderBoardHook = () => {
  const [data, setData] = useState<LeaderBoardUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { local } = useSelector((state: RootState) => state.translation);

  const getLeaderBoards = async (
    take: number,
    page: number,
    type: string,
    reset?: boolean
  ) => {
    setLoading(true);
    setError(null); // Clear previous errors
    if (reset) {
      setData([]);
      setDone(false);
    }

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }leaderboard?take=${take}&page=${page}&type=${type}&locale=${local}`
      );

      if (response.data["success"]) {
        if (reset === true) {
          setData(response.data.data);
        } else {
          setData((prevData) => {
            const newData = response.data.data.filter(
              (item: LeaderBoardUser) =>
                !prevData.some(
                  (existingItem) =>
                    existingItem.author?.username === item.author?.username
                )
            );
            return newData.length ? [...prevData, ...newData] : prevData;
          });
        }

        if (response.data["data"].length === 0) {
          setDone(true);
        }
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { getLeaderBoards, data, loading, error, done };
};
