import { useEffect, useState } from "react";
import axios from "axios";
import { Credit } from "@/models/Credit";

export const usePlans = () => {
  const [plans, setPlans] = useState<Credit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}monetization/plans`
      );
      setPlans(response.data.data || []); // Adjust this if the response shape is different
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading, error };
};
