import { RootState } from "@/lib/store";
import { HomeData } from "@/models/homeData";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useHomeHook = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<HomeData>();

  const { local } = useSelector((state: RootState) => state.translation);

  const getHomeData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `home?locale=${local}`
      );

      if (response.data["success"]) {
        setData(response.data["data"]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { getHomeData, data, loading };
};
