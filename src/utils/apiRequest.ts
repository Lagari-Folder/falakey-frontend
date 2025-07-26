// utils/apiRequest.ts
import axios, { Method } from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

interface ApiRequestOptions {
  method: Method;
  url: string;
  data?: any;
  token?: string;
  withLocale?: boolean;
  isFormData?: boolean;
  showError?: boolean;
  showSuccess?: boolean;
  customErrorMessage?: string;
  customSuccessMessage?: string;
}

export const apiRequest = async ({
  method,
  url,
  data = {},
  token,
  withLocale = false,
  isFormData = false,
  showError = false,
  showSuccess = false,
  customErrorMessage,
  customSuccessMessage,
}: ApiRequestOptions) => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const locale = Cookies.get("locale") || "ar";

  const finalUrl = withLocale
    ? `${baseURL}${url}?locale=${locale}`
    : `${baseURL}${url}`;

  const headers: any = {
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!isFormData && method !== "get") {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await axios({
      method,
      url: finalUrl,
      data,
      headers,
    });

    if (showSuccess) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text:
          customSuccessMessage ||
          response?.data?.message ||
          "Request completed successfully.",
        confirmButtonText: "OK",
      });
    }


    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.log(error);

    const errorMessage =
      error?.response?.data?.message ||
      customErrorMessage ||
      "Unknown error occurred.";

    if (showError) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        confirmButtonText: "OK",
      });
    }

    return {
      success: false,
      error: errorMessage,
      fullError: error,
    };
  }
};
