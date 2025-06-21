import { RootState } from "@/lib/store";
import { Post } from "@/models/post";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useListingHook = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>();

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const getListingPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `users/posts/all?locale=${local}`,
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

  return { getListingPosts, data, loading };
};
