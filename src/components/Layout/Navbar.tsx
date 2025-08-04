import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import starIcon from "../../../public/icons/star-icon.svg";
import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthenticationModal from "../Authentication/AuthenticationModal";

import MenuIcon from "@mui/icons-material/Menu";

import UploadModal from "../UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import DashboardModal from "../DashboardModal";
import ResponsiveMenuModal from "./ResponsiveMenuModal";
import FavoritesModal from "../FavoritesModal";
import { search } from "@/lib/slices/searchSlice";
import NotificationModal from "../NotificationModal";
import { Chat } from "@/models/Chat";
import { Notification } from "@/models/notification";
import { Badge } from "@mui/material";
import { useTrans } from "@/utils/translation";
import LanguageSelector from "../LanguageSelector";
import { useNavigateWithLocale } from "@/helper/navigateWithLocale";
import { apiRequest } from "@/utils/apiRequest";

const Navbar = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [signUp, setSignUp] = useState(false);

  const [openDashboardModal, setOpenDashboardModal] = useState(false);
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const [openResponsiveMenu, setOpenResponsiveMenu] = useState(false);

  const navigate = useNavigateWithLocale();

  const { user, isLoggedIn, token } = useSelector(
    (state: RootState) => state.auth
  );
  const previousearchData = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState<number>(0);
  const [chats, setChats] = useState<Chat[]>([]);

  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const location = useLocation();

  const [searchValue, setSearchValue] = useState(previousearchData.search); // State to store input value

  const { t } = useTrans();

  useEffect(() => {
    const isHomePage = ["/", "/en", "/ar"].includes(
      location.pathname.replace(/\/+$/, "")
    );
    if (isHomePage) setSearchValue("");
  }, [location]);

  useEffect(() => {
    if (
      openAuthModal ||
      openUploadModal ||
      showFavoritesModal ||
      openNotificationModal
    ) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [
    openAuthModal,
    openUploadModal,
    showFavoritesModal,
    openNotificationModal,
  ]);

  const handleSearchEvent = () => {
    setSearchValue(
      searchValue !== "" ? searchValue : previousearchData.search ?? ""
    );
    dispatch(
      search({
        ...previousearchData,
        search:
          searchValue !== "" ? searchValue : previousearchData.search ?? "",
      })
    );
  };

  useEffect(() => {
    if (!user && openUploadModal) {
      setOpenUploadModal(false);
      setSignUp(false);
      setOpenAuthModal(true);
    }
  }, [openUploadModal]);

  useEffect(() => {
    if (isLoggedIn) {
      apiRequest({
        method: "GET",
        url: "notifications",
        withLocale: true,
        token: token!,
      }).then((result) => {
        if (result["success"]) {
          setNotifications(result["data"]["data"]["notifications"]["list"]);
          setChats(result["data"]["data"]["chats"]["list"]);
          setUnread(
            result["data"]["data"]["notifications"]["unread_count"] +
              result["data"]["data"]["chats"]["unread_count"]
          );
        }
      });
    }
  }, [isLoggedIn]);

  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <>
      {showFavoritesModal && (
        <FavoritesModal
          showFavoritesModal={showFavoritesModal}
          showModal={(visible) => {
            setShowFavoritesModal(visible);
          }}
        />
      )}
      {openAuthModal && (
        <AuthenticationModal
          modalHandler={setOpenAuthModal}
          signUpBool={signUp}
        />
      )}

      {openUploadModal && user && (
        <UploadModal modalHandler={setOpenUploadModal} />
      )}

      <nav className="h-[70px] fixed z-20 w-screen  flex py-3 px-5 gap-4 bg-white items-center">
        <a
          href={`/${local}?types=photo`}
          onClick={() => {
            window.location.reload();
          }}
        >
          <img src={starIcon} alt="Star Icon" className="size-[35px]" />
        </a>
        <div className="rounded-full bg-[#eeeeee] !text-[#767676] h-full flex flex-1 gap-2 items-center justify-center w-full px-4">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <input
            type="search"
            enterKeyHint="search"
            className="w-full bg-transparent h-full focus-within:outline-none font-bold"
            placeholder={
              previousearchData.placeholder || t("navbar.search_photo")
            }
            value={searchValue ?? ""}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter" && searchValue!.trim() !== "") {
                handleSearchEvent();
                navigate(
                  `/explore?types=${
                    previousearchData.types ?? "photo"
                  }&search=${encodeURIComponent(searchValue ?? "")}`
                );
              }
            }}
          />
        </div>
        <div className="lg:flex hidden gap-6 font-bold text-md text-[#767676] items-center">
          <NavLink
            to={`/${local}/explore?types=${
              previousearchData.types
            }&search=${encodeURIComponent(searchValue ?? "")}`}
            onClick={() => {
              handleSearchEvent();
            }}
            className=" cursor-pointer"
          >
            {t("navbar.explore")}
          </NavLink>
          <NavLink to={`/${local}/challenge`} className=" cursor-pointer">
            {t("navbar.challenges")}
          </NavLink>
          <div className="h-[30px] w-[2px] bg-gray-300"></div>
          <LanguageSelector />
          {isLoggedIn ? (
            <div className="flex items-center justify-center gap-4  cursor-pointer relative">
              <div
                className="flex cursor-pointer items-center justify-center text-gray-400 !text-[23px]"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  setOpenNotificationModal((prev) => !prev);
                }}
              >
                <Badge
                  badgeContent={unread}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#44175b",
                      color: "white",
                    },
                  }}
                >
                  <FontAwesomeIcon icon={faBell} />
                </Badge>
              </div>
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenDashboardModal(!openDashboardModal);
                }}
              >
                <div className="bg-custom-gray rounded-full h-[30px] w-[30px] flex justify-center items-center text-center   ">
                  <img
                    src={user!.avatar}
                    alt={user?.display_name}
                    className="rounded-full object-cover h-full w-full"
                  />
                </div>
                <div className={``}>{user!.display_name}</div>
              </div>

              {openNotificationModal && (
                <NotificationModal
                  openModal={openNotificationModal}
                  modalHandler={setOpenNotificationModal}
                  chats={chats}
                  notifications={notifications}
                />
              )}
              {openDashboardModal && (
                <DashboardModal
                  openModal={openDashboardModal}
                  modalHandler={setOpenDashboardModal}
                  showFavoritesModal={(b: boolean) => {
                    setShowFavoritesModal(b);
                    setOpenDashboardModal(false);
                  }}
                />
              )}
            </div>
          ) : (
            <div
              onClick={() => {
                setSignUp(false);
                setOpenAuthModal(!openAuthModal);
              }}
              className=" cursor-pointer"
            >
              {t("authentication.login")}
            </div>
          )}
          <button
            onClick={() => setOpenUploadModal(!openUploadModal)}
            className="submit-button border-[1.5px] border-gray-300 rounded-lg shadow-sm py-1 px-3"
          >
            {t("navbar.image_submit")}
          </button>
        </div>
        <div className="lg:hidden flex items-center gap-2 text-[#767676] relative">
          <LanguageSelector />
          <div
            onMouseDown={(e) => e.stopPropagation()} // Prevent outside click trigger
            onClick={() => {
              setOpenResponsiveMenu((prev) => !prev);
            }}
          >
            <MenuIcon />
          </div>

          {openResponsiveMenu && (
            <ResponsiveMenuModal
              openModal={openResponsiveMenu}
              modalHandler={(b: boolean) => setOpenResponsiveMenu(b)}
              showFavoritesModal={(b: boolean) => {
                setShowFavoritesModal(b);
                setOpenResponsiveMenu(false);
              }}
              uploadImageHandler={(b: boolean) => {
                setOpenUploadModal(b);
              }}
              loginHandler={(b: boolean) => {
                setSignUp(false);
                setOpenAuthModal(b);
              }}
              registerHandler={(b: boolean) => {
                setSignUp(true);
                setOpenAuthModal(b);
              }}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
