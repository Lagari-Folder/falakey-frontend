import { RootState } from "@/lib/store";
import { Challenge } from "@/models/challenge";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useFetchChallengeDetail = (slug: string) => {
  const [data, setData] = useState<Challenge>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { local } = useSelector((state: RootState) => state.translation);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}challenges/show/${slug}?locale=${local}`
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
  }, [slug]);

  return { data, loading, error };
};

export const useFetchChallenge = () => {
  const [data, setData] = useState<{
    active: Challenge[];
    expired: Challenge[];
  }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { local } = useSelector((state: RootState) => state.translation);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}challenges?locale=${local}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const json = await response.json();

        setData(json["data"]);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { data, loading, error };
};
