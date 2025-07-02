import { RootState } from "@/lib/store";
import { DashboardData } from "@/models/dashboard";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useDashboardHook = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData>();

  const { local } = useSelector((state: RootState) => state.translation);
  const { token } = useSelector((state: RootState) => state.auth);

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `dashboard?locale=${local}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  return { getDashboardData, data, loading };
};
