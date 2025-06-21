// src/GoogleCallback.js

import { login } from "@/lib/slices/authSlice";
import { useTrans } from "@/utils/translation";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function GoogleCallback() {
  const location = useLocation();

  const dispatch = useDispatch();

  const { t } = useTrans();

  // On page load, we take "search" parameters
  // and proxy them to /api/auth/callback on our Laravel API
  axios
    .get(
      import.meta.env.VITE_BASE_URL + `auth/google/callback${location.search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data["success"]) {
        Swal.fire({
          title: t("google.success_title"),
          text: t("google.success_text"),
          icon: "success",
          confirmButtonText: t("google.ok"),
        });

        dispatch(
          login({
            user: response.data["data"]["user"],
            isLoggedIn: true,
            token: response.data["data"]["token"],
          })
        );
      } else {
        Swal.fire({
          title: t("google.error_title"),
          text: t("google.error_text"),
          icon: "success",
          confirmButtonText: t("google.ok"),
        });
      }
    });
  useEffect(() => {}, []);

  return <Navigate to="/" />;
}

export default GoogleCallback;
