import { useState } from "react";
import axios from "axios";
import { login } from "@/lib/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { User } from "@/models/user";
import { RootState } from "@/lib/store";

export const useAuthenticationHook = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User>();

  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState<string | null>();

  const dispatch = useDispatch();

  const { local } = useSelector((state: RootState) => state.translation);

  const resetError = () => {
    setError("");
  };

  const registerHook = async (
    fn: string,
    ln: string,
    e: string,
    u: string,
    p: string,
    pc: string,
    t: boolean
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + `auth/register?locale=${local}`,
        {
          first_name: fn,
          last_name: ln,
          email: e,
          username: u,
          password: p,
          password_confirmation: pc,
          terms_and_conditions: t,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setData(response.data["data"]["user"]);
        setMessage(response.data["message"]);
        dispatch(
          login({
            user: response.data["data"]["user"],
            isLoggedIn: true,
            token: response.data["data"]["token"],
          })
        );
      } else {
        setError(response.data["message"]);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Axios error with a response
        setError(error.response.data["message"]);
      } else {
        // Fallback for unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginHook = async (u: string, p: string) => {
    setLoading(true);
    setError(null);

    try {
      const loginData = {
        password: p,
        email: <null | string>null,
        username: <null | string>null,
      };
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailRegex.test(u)) {
        loginData.email = u; // Add email if valid
      } else {
        loginData.username = u; // Add username if not an email
      }

      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + `auth/login?locale=${local}`,
        loginData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setData(response.data["data"]["user"]);

        dispatch(
          login({
            user: response.data["data"]["user"],
            isLoggedIn: true,
            token: response.data["data"]["token"],
          })
        );
      } else {
        setError(response.data["message"]);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Axios error with a response
        setError(error.response.data["message"]);
      } else {
        // Fallback for unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "users/profile",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data["success"]) {
        setData(response.data["data"]["user"]);

        dispatch(
          login({
            user: response.data["data"]["user"],
            isLoggedIn: true,
            token: response.data["data"]["token"],
          })
        );
      } else {
        setError(response.data["message"]);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Axios error with a response
        setError(error.response.data["message"]);
      } else {
        // Fallback for unexpected errors
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    registerHook,
    loginHook,
    getUserProfile,
    resetError,
    data,
    loading,
    message,
    error,
  };
};
