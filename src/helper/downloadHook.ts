import { RootState } from "@/lib/store";
import { Post } from "@/models/post";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useDownloadHook = () => {
  const [data, setData] = useState<Post[]>();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const getDownloads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `download-history?locale=${local}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data["success"]) {
        setData(response.data["data"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return { getDownloads, data, loading };
};
