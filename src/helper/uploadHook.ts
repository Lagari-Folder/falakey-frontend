import { RootState } from "@/lib/store";
import { Collection } from "@/models/collection";
import { Tag } from "@/models/tag";
import { UploadParam } from "@/models/uploadParam";
import { useTrans } from "@/utils/translation";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
export const useUploadHook = () => {
  const [data, setData] = useState<{
    tags: Tag[] | null;
    collections: Collection[] | null;
  }>({
    tags: null,
    collections: null,
  });

  const [loading, setLoading] = useState<{
    tags: boolean;
    collections: boolean;
  }>({
    tags: false,
    collections: false,
  });

  const [error, setError] = useState<{
    message: string | null;
    tags: string | null;
    collections: string | null;
  }>({
    message: null,
    tags: null,
    collections: null,
  });

  const [successUpload, setSuccessUpload] = useState<{
    success: boolean;
    message: string;
    loading: boolean;
  }>({ success: false, message: "", loading: false });
  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);
  const { t } = useTrans();

  const getTags = async () => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, tags: true }));
      setError((prevError) => ({ ...prevError, tags: null }));

      // Example API call
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}tags?locale=${local}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setData((prevData) => ({ ...prevData, tags: response.data["data"] }));
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        tags: err instanceof Error ? err.message : "Unknown error",
      }));
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, tags: false }));
    }
  };

  const getCollections = async () => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, collections: true }));
      setError((prevError) => ({ ...prevError, collections: null }));

      // Example API call
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}collections?locale=${local}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setData((prevData) => ({
          ...prevData,
          collections: response.data["data"],
        }));
      } else {
        setSuccessUpload({
          success: false,
          message: response.data["message"],
          loading: false,
        });
      }
    } catch (err) {
      setError((prevError) => ({
        ...prevError,
        collections: err instanceof Error ? err.message : "Unknown error",
      }));
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, collections: false }));
    }
  };

  const uploadPosts = async (
    uploadedData: UploadParam[],
    filtering?: { key: string; value: string }[]
  ) => {
    setSuccessUpload({
      success: false,
      message: "",
      loading: true,
    });
    try {
      const formData = new FormData();

      for (let index = 0; index < uploadedData.length; index++) {
        const element = uploadedData[index];
        filtering?.map((filter) => {
          formData.append(`items[${index}][${filter.key}]`, filter?.value);
        });
        formData.append(`items[${index}][title]`, element.title ?? "");
        formData.append(
          `items[${index}][is_download_locked]`,
          String(element.isLocked ?? false)
        );
        formData.append(
          `items[${index}][is_premium]`,
          String(element.isPremium ?? false)
        );
        formData.append(
          `items[${index}][location]`,
          element.location ? element.location.name ?? "" : ""
        );

        formData.append(
          `items[${index}][location_lat]`,
          element.location ? element.location.lat ?? "" : ""
        );
        formData.append(
          `items[${index}][location_lng]`,
          element.location ? element.location.long ?? "" : ""
        );

        element.tags?.map((tag, tagIndex) => {
          formData.append(
            `items[${index}][tags][${tagIndex}]`,
            tag.id.toString()
          );
        });

        element.collections?.map((tag, collectionIndex) => {
          formData.append(
            `items[${index}][collections][${collectionIndex}]`,
            tag.id.toString()
          );
        });
        formData.append(
          `items[${index}][description]`,
          element.description ?? ""
        );
        formData.append(
          `items[${index}][media_path]`,
          element.img?.tempPath ?? ""
        );
        formData.append(
          `items[${index}][height]`,
          element.img?.height?.toString() ?? ""
        );
        formData.append(
          `items[${index}][width]`,
          element.img?.width?.toString() ?? ""
        );
        if (element.img?.thumbnail)
          formData.append(
            `items[${index}][thumbnail]`,
            element.img?.thumbnail ?? ""
          );
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}posts/upload?locale=${local}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setSuccessUpload({
          success: true,
          message: response.data["message"],
          loading: false,
        });
      } else {
        setSuccessUpload({
          success: false,
          message: response.data["message"],
          loading: false,
        });
      }
    } catch (error) {
      setSuccessUpload({
        success: false,
        message: t("common.error_text"),
        loading: false,
      });

      return error;
    }
  };

  return {
    data,
    loading,
    error,
    successUpload,
    uploadPosts,
    getTags,
    getCollections,
  };
};
