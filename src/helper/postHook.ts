import { RootState } from "@/lib/store";
import { Post } from "@/models/post";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Hook to fetch a single post by slug
 */
export const useFetchPostDetail = (slug: string) => {
  const [data, setData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}posts/show/${slug}?locale=${local}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // signal: controller.signal,
          }
        );

        if (response.data?.success) {
          setData(response.data.data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError((err as Error).message || "Failed to load post");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    return () => {
      controller.abort();
    };
  }, [slug, token]);

  return { data, loading, error };
};

export const useMasonryPostHook = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [more, setMore] = useState(true);

  const [oldSearch, setOldSearch] = useState<Partial<
    RootState["search"]
  > | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const searchState = useSelector((state: RootState) => state.search);
  const { local } = useSelector((state: RootState) => state.translation);

  const abortControllerRef = useRef<AbortController | null>(null);
  const pageRef = useRef<number>(1);

  const fetchPosts = async (stringFiltering?: string) => {
    if (!more || loading) return;

    // Abort previous request if needed
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const searchChanged =
      !oldSearch || JSON.stringify(oldSearch) !== JSON.stringify(searchState);

    if (searchChanged) {
      setData([]);
      pageRef.current = 1;
      setMore(true);
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams();

    if (searchState.types) params.append("types", searchState.types);
    if (searchState.search) params.append("search", searchState.search);
    if (searchState.sort) params.append("sort", searchState.sort);
    if (searchState.collection)
      params.append("collections", searchState.collection);
    if (searchState.filter) {
      Object.entries(searchState.filter).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          params.append(key, value);
        }
      });
    }

    if (stringFiltering) {
      const filters = new URLSearchParams(stringFiltering);
      for (const [key, value] of filters.entries()) {
        if (!params.has(key)) {
          params.append(key, value);
        }
      }
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}posts?page=${
          pageRef.current
        }&take=10&${params.toString()}&locale=${local}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }
      );

      if (response.data?.success) {
        const newData: Post[] = response.data.data;

        setData((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const filtered = newData.filter((p) => !existingIds.has(p.id));
          return searchChanged ? filtered : [...prev, ...filtered];
        });

        if (newData.length === 0) setMore(false);
        else pageRef.current++;
      }
    } catch (err) {
      if (!controller.signal.aborted) {
        setError((err as Error).message || "Failed to load posts");
      }
    } finally {
      setLoading(false);
      setOldSearch(searchState);
      abortControllerRef.current = null;
    }
  };

  const toggleFavoriteData = (id: number) => {
    setData((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              is_favorite: !post.is_favorite,
              favorites_count: post.is_favorite
                ? post.favorites_count - 1
                : post.favorites_count + 1,
            }
          : post
      )
    );
  };

  const removeFavoriteOfAll = () => {
    setData((prev) =>
      prev.map((post) => ({
        ...post,
        is_favorite: false,
      }))
    );
  };

  return {
    fetchPosts,
    toggleFavoriteData,
    removeFavoriteOfAll,
    data,
    loading,
    error,
    more,
  };
};

/**
 * Hook to manage user favorites
 */
export const useFavoriteHook = () => {
  const [favorites, setFavorites] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BASE_URL
        }posts/my-favorites?page=1&locale=${local}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data?.success) {
        setFavorites(response.data.data);
      }
    } catch (err) {
      setError((err as Error).message || "Failed to load favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (id: number) => {
    setLoading(true);

    try {
      const result = await toggleFavoritePost(id, token ?? "");
      if (result) {
        setFavorites((prev) => prev.filter((fav) => fav.id !== id));
      }
    } catch (err) {
      setError((err as Error).message || "Failed to remove favorite");
    } finally {
      setLoading(false);
    }
  };

  return { fetchFavorites, removeFavorite, favorites, loading, error };
};

/**
 * Toggle favorite status of a post
 */
export const toggleFavoritePost = async (
  id: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}posts/toggle-favorite/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data?.success || false;
  } catch {
    return false;
  }
};

/**
 * Upload temp file
 */
export const getFileTemp = async (file: File, token: string) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}files/temp-upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      message: "File uploaded successfully.",
      temp_path: response.data?.data?.temp_path || undefined,
      preview_url: response.data?.data?.preview_url || undefined,
    };
  } catch (error: any) {
    let errorMessage = "Something went wrong. Please try again.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        errorMessage =
          error.response.data?.message ||
          "Invalid file format or size. Please check your file and try again.";
      } else {
        errorMessage = error.response?.data?.message || errorMessage;
      }
    }

    return {
      success: false,
      message: errorMessage,
      temp_file_path: "",
    };
  }
};
