import { useRef, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StyleIcon from "@mui/icons-material/Style";
import LockIcon from "@mui/icons-material/Lock";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/slices/authSlice";
import { useTrans } from "@/utils/translation";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import { RootState } from "@/lib/store";

const DashboardModal = ({
  openModal,
  modalHandler,
  showFavoritesModal,
}: {
  openModal: boolean;
  modalHandler: (b: boolean) => void;
  showFavoritesModal: (b: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const navigate = useNavigateWithLocale();

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        openModal
      ) {
        modalHandler(false); // Close modal if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <>
      {openModal && (
        <div
          ref={modalRef}
          className="absolute top-full right-0 mt-2 bg-white border border-gray-300 shadow-xl rounded-lg  w-72 py-5 text-[#767676] !text-md font-semibold space-y-2 z-20"
        >
          <NavLink
            to={`/${local}/my-account`}
            onClick={() => modalHandler(false)}
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
          >
            <DashboardIcon className="!text-[18px]" /> {t("sidebar.dashboard")}
          </NavLink>
          <NavLink
            to={`/${local}/my-account/messages`}
            onClick={() => modalHandler(false)}
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
          >
            <MessageIcon className="!text-[18px]" /> {t("sidebar.messages")}
          </NavLink>
          <NavLink
            to={`/${local}/my-account/notification-settings`}
            onClick={() => modalHandler(false)}
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
          >
            <NotificationImportantIcon className="!text-[18px]" />{" "}
            {t("sidebar.notifications")}
          </NavLink>

          <div
            className="hover:text-primary items-center flex gap-3 text-lg px-5 cursor-pointer"
            onClick={() => {
              showFavoritesModal(true);
            }}
          >
            <FavoriteIcon className="!text-[18px]" /> {t("sidebar.favorites")}
          </div>
          <div className="w-full h-[1px] bg-gray-300"></div>
          <NavLink
            to={`/${local}/my-account/listings`}
            onClick={() => modalHandler(false)}
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
          >
            <LocationOnIcon className="!text-[18px]" /> {t("sidebar.listings")}
          </NavLink>
          <div className="w-full h-[1px] bg-gray-300" />
          <NavLink
            to={`/${local}/my-account/account-details`}
            onClick={() => modalHandler(false)}
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
          >
            <StyleIcon className="!text-[18px]" />{" "}
            {t("sidebar.account_details")}
          </NavLink>
          <div
            className="hover:text-primary items-center flex gap-3 text-lg px-5"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <LockIcon className="!text-[18px]" /> {t("sidebar.logout")}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardModal;
