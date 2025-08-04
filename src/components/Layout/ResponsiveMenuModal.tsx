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
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";

const ResponsiveMenuModal = ({
  openModal,
  modalHandler,
  showFavoritesModal,
  uploadImageHandler,
  loginHandler,
  registerHandler,
}: {
  openModal: boolean;
  modalHandler: (b: boolean) => void;
  showFavoritesModal: (b: boolean) => void;
  uploadImageHandler: (b: boolean) => void;
  loginHandler: (b: boolean) => void;
  registerHandler: (b: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  // Close the modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
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

  const { local } = useSelector((state: RootState) => state.translation);
  const { t } = useTrans();

  return (
    <>
      {openModal && (
        <div
          ref={modalRef}
          className={`absolute top-full text-[#767676] ${
            local == "ar" ? "left-0" : "right-0"
          } mt-2 bg-white border border-gray-300 shadow-xl rounded-lg  w-72 pt-5 pb-2 !text-md font-semibold space-y-2 z-50`}
        >
          {isLoggedIn ? (
            <>
              <NavLink
                to={`/${local}/my-account`}
                onClick={() => modalHandler(false)}
                className="hover:text-primary items-center flex gap-3 text-lg px-5"
              >
                <DashboardIcon className="!text-[18px]" />{" "}
                {t("sidebar.dashboard")}
              </NavLink>
              <NavLink
                to={`/${local}/my-account/messages`}
                onClick={() => modalHandler(false)}
                className="hover:text-primary items-center flex gap-3 text-lg px-5"
              >
                <MessageIcon className="!text-[18px]" /> {t("sidebar.messages")}
              </NavLink>
              <NavLink
                to={`/${local}/my-account/notification`}
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
                <FavoriteIcon className="!text-[18px]" />{" "}
                {t("sidebar.favorites")}
              </div>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </>
          ) : (
            <></>
          )}
          {isLoggedIn ? (
            <>
              <NavLink
                to={`/${local}/my-account/listings`}
                onClick={() => modalHandler(false)}
                className="hover:text-primary items-center flex gap-3 text-lg px-5"
              >
                <LocationOnIcon className="!text-[18px]" />{" "}
                {t("sidebar.listings")}
              </NavLink>
            </>
          ) : (
            <div className="space-y-2">
              <NavLink
                to={`/${local}/explore`}
                onClick={() => modalHandler(false)}
                className="hover:text-primary items-center flex gap-3 text-lg px-5"
              >
                <MessageIcon className="!text-[18px]" /> {t("navbar.explore")}
              </NavLink>
              <NavLink
                to={`/${local}/challenge`}
                onClick={() => modalHandler(false)}
                className="hover:text-primary items-center flex gap-3 text-lg px-5"
              >
                <NotificationImportantIcon className="!text-[18px]" />{" "}
                {t("navbar.challenges")}
              </NavLink>
            </div>
          )}
          <div className="w-full h-[1px] bg-gray-300" />
          {isLoggedIn ? (
            <>
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
                }}
              >
                <LockIcon className="!text-[18px]" /> {t("sidebar.logout")}
              </div>
            </>
          ) : (
            <div className="py-2 text-[#767676] gap-2 flex flex-col items-center">
              <div className="flex gap-2 px-4 justify-center w-full ">
                <button
                  onClick={() => {
                    uploadImageHandler(true);
                  }}
                  className="submit-button border-[1.5px] border-gray-300 rounded-lg shadow-sm py-1 px-3"
                >
                  {t("sidebar.image_submit")}
                </button>
                <button
                  onClick={() => {
                    loginHandler(true);
                  }}
                  className="submit-button border-[1.5px] border-gray-300 rounded-lg shadow-sm py-1 px-3"
                >
                  {t("authentication.login")}
                </button>
              </div>
              <div
                onClick={() => {
                  registerHandler(true);
                }}
              >
                {t("authentication.new_falakey")}{" "}
                <span className="underline">
                  {t("authentication.sign_up_free")}
                </span>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <div className="w-full h-[1px] bg-gray-300"></div>
              <div className="flex gap-2 px-4 py-1 justify-center w-full ">
                <button
                  onClick={() => {
                    uploadImageHandler(true);
                  }}
                  className="submit-button border-[1.5px] border-gray-300 rounded-lg shadow-sm py-1 px-3"
                >
                  {t("navbar.image_submit")}
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ResponsiveMenuModal;
