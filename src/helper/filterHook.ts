import { RootState } from "@/lib/store";
import { Filter } from "@/models/filter";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchFilter = (stringFiltering: string) => {
  const [data, setData] = useState<Filter>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }posts/filters?${stringFiltering}&locale=${local}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data["success"]) {
          setData(response.data["data"]);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [stringFiltering, local]);

  return { data, loading, error };
};
