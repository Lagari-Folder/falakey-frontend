import { RootState } from "@/lib/store";
import { User } from "@/models/user";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useUserHook = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const getUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "users/profile/private?locale=${local}",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data["success"]) {
        setUser(response.data["data"]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserData = async (
    userData: User,
    cp?: string,
    np?: string,
    cnp?: string,
    avatar?: File | null,
    cover?: File | null
  ) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("first_name", userData.first_name!);
    formData.append("last_name", userData.last_name!);
    formData.append("display_name", userData.display_name!);
    formData.append("email", userData.email!);

    (userData.social_media ?? []).map((media, index) => {
      formData.append(`social_media[${index}][platform]`, media.platform);
      formData.append(`social_media[${index}][value]`, media.value);
    });

    formData.append(
      "available_for_hire",
      userData.available_for_hire ? "1" : "0"
    );
    formData.append("bio", userData.bio! ?? "");
    formData.append("current_password", cp ?? "");
    formData.append("new_password", np ?? "");
    formData.append("new_password_confirmation", cnp ?? "");
    if (avatar) formData.append("avatar", avatar!);
    if (cover) formData.append("cover", cover!);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + `users/profile?locale=${local}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data["success"]) {
        setUser(response.data["data"]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { getUserData, updateUserData, user, loading };
};

export const getPublicUserData = async (username: string, token: string) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `users/${username}/profile/public`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data["success"]) {
      return [true, response.data["data"]];
    }
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};

export const getNotifications = async (token: string) => {
  const local = Cookies.get("locale") || "ar";
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `notifications?locale=${local}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data["success"]) {
      return [true, response.data["data"]];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};

export const toggleFollow = async (username: string, token: string) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_BASE_URL + "users/toggle-follow",
      {
        username: username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data["success"]) {
      return [true, response.data["data"]];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
export const getFollowers = async (username: string) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `users/${username}/followers`
    );
    if (response.data["success"]) {
      return [true, response.data["data"]];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
export const getFollowing = async (username: string) => {
  try {
    const response = await axios.get(
      import.meta.env.VITE_BASE_URL + `users/${username}/following`
    );
    if (response.data["success"]) {
      return [true, response.data["data"]];
    }
    return [];
  } catch (error) {
    console.log(error);
    return [false, error];
  }
};
