import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/store";

export const useNavigateWithLocale = () => {
  const navigate = useNavigate();
  const locale = useSelector((state: RootState) => state.translation.local);

  return (to: string, options?: { replace?: boolean; state?: any }) => {
    const path = `/${locale}${to.startsWith("/") ? to : `/${to}`}`;
    navigate(path, options);
  };
};
