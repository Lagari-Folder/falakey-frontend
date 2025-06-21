import logo_Dark from "../../../public/images/falakey-logo-secondary.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthenticationModal from "../Authentication/AuthenticationModal";
import UploadModal from "../UploadModal";
import CollectionsIcon from "@mui/icons-material/Collections";
import SendIcon from "@mui/icons-material/Send";
import AddBoxIcon from "@mui/icons-material/AddBox";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import DashboardModal from "../DashboardModal";
// import NotificationModal from "../NotificationModal";
import {
  faFacebookF,
  faPinterestP,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import FavoritesModal from "../FavoritesModal";

const AdminNavbar = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openDashboardModal, setOpenDashboardModal] = useState(false);
  const [openNotificationModal, setOpenNotifcationModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [menuState, setMenuState] = useState("closed");

  const location = useLocation();

  const isHomePage = ["/", "/en", "/ar"].includes(
    location.pathname.replace(/\/+$/, "")
  );

  useEffect(() => {
    if (openAuthModal || openUploadModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [openAuthModal, openUploadModal, openDashboardModal, openMenuModal]);

  useEffect(() => {
    if (!user && openUploadModal) {
      setOpenUploadModal(false);
      setOpenAuthModal(true);
    }
  }, [openUploadModal]);
  // Handle the menu opening
  const handleMenuOpen = () => {
    setMenuState("opening");
    setTimeout(() => {
      setOpenMenuModal(true);
      setMenuState("open");
    }, 100); // Start animation
  };

  // Handle the menu closing
  const handleMenuClose = () => {
    setMenuState("closing");
    setTimeout(() => {
      setMenuState("closed");
      setOpenMenuModal(false);
    }, 300); // Match animation duration
  };

  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <>
      <div className="xl:hidden fixed bottom-0 right-0 left-0 h-[60px] bg-primary/90 backdrop-blur-sm z-20 flex justify-evenly text-[10px] text-white items-center">
        <NavLink to={`/${local}/collections`} className="text-center space-y-1">
          <CollectionsIcon sx={{ fontSize: 20 }} />
          <div>Collections</div>
        </NavLink>
        <div
          className="text-center space-y-1"
          onClick={() => setOpenUploadModal(!openUploadModal)}
        >
          <AddBoxIcon sx={{ fontSize: 20 }} />
          <div>Upload</div>
        </div>
        <NavLink
          to={`/${local}/my-account/messages`}
          className="text-center space-y-1"
        >
          <SendIcon sx={{ fontSize: 20 }} />
          <div>Messages</div>
        </NavLink>
        <NavLink
          className="text-center space-y-1"
          to={`/${local}/my-account/notification-settings`}
        >
          <NotificationsIcon sx={{ fontSize: 20 }} />
          <div>Notifications</div>
        </NavLink>
        <div className="text-center space-y-1" onClick={handleMenuOpen}>
          <MenuIcon sx={{ fontSize: 20 }} />
          <div>Menu</div>
        </div>
      </div>
      <header
        className={` ${
          isHomePage ? "absolute bg-transparent" : "bg-white"
        } top-0 right-0 left-0 w-full flex justify-center  z-30 ${
          isHomePage ? "" : "shadow-custom-bottom"
        } `}
      >
        {/* Sliding Menu */}
        {(menuState !== "closed" || openMenuModal) && (
          <div
            className={`fixed top-0 right-0 h-full w-full bg-white z-50 transform transition-transform duration-300 z-60 ${
              menuState === "opening"
                ? "translate-x-full"
                : menuState === "closing"
                ? "translate-x-full"
                : "translate-x-0"
            }`}
          >
            <div className="flex flex-col justify-between items-center py-4 h-full">
              {/* Top Section */}
              <div className="flex flex-col items-center w-full">
                <div className="flex w-full h-16 justify-center items-center">
                  <img src={logo_Dark} alt="Menu Logo" className="h-16" />
                </div>
                <div className="w-full text-[15px]">
                  <p className="block py-2.5 px-4 text-black leading-[23px] font-semibold no-underline">
                    My Account
                  </p>
                  <a
                    href={`https://www.falakey.com/${local}/license/`}
                    className="block py-2.5 px-4 text-black leading-[23px] font-semibold no-underline"
                  >
                    Content License
                  </a>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="w-full flex flex-col gap-4">
                <div className="btn w-full justify-center flex px-4 gap-1">
                  <button
                    className="w-[30px] h-[30px] font-semibold bg-[#4267B2] text-[12px] text-white rounded-lg border justify-center"
                    onClick={handleMenuClose}
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </button>
                  <button
                    className="w-[30px] h-[30px] font-semibold bg-[#1DA1F2] text-[12px] text-white rounded-lg border justify-center"
                    onClick={handleMenuClose}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </button>
                  <button
                    className="w-[30px] h-[30px] font-semibold bg-[#E60023] text-[12px] text-white rounded-lg border justify-center"
                    onClick={handleMenuClose}
                  >
                    <FontAwesomeIcon icon={faPinterestP} />
                  </button>
                </div>
                <div className="btn w-full justify-end flex px-4">
                  <button
                    className="font-semibold bg-white text-[12px] text-black rounded-lg border py-[6px] px-3"
                    onClick={handleMenuClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className=" flex w-full justify-between items-center pt-4 pb-3 mx-2">
          <a
            className="h-full w-[150px] flex items-center justify-center cursor-pointer"
            href={`/${local}`}
          >
            <img src={`${logo_Dark}`} alt="Logo" className="object-cover" />
          </a>
          <div className="flex flex-wrap items-center sm:justify-center justify-end sm:gap-6 text-white font-bold text-sm">
            {isLoggedIn ? (
              <div className="flex items-center justify-center gap-2 cursor-pointer relative">
                <div
                  className="bg-custom-gray xl:flex hidden rounded-full h-[30px] w-[30px] justify-center items-center text-center relative"
                  onClick={() => {
                    setOpenDashboardModal(false);
                    setOpenNotifcationModal(!openNotificationModal);
                  }}
                >
                  <NotificationImportantIcon className="text-primary" />
                  {/* {openNotificationModal && <NotificationModal />} */}
                </div>

                <div
                  className="flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOpenNotifcationModal(false);
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
                  <div className={`${isHomePage ? "" : "text-primary"}`}>
                    {user!.display_name}
                  </div>
                </div>
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
                className="flex items-center justify-center gap-3 cursor-pointer"
                onClick={() => setOpenAuthModal(true)}
              >
                <div className="bg-custom-gray rounded-full h-[30px] w-[30px] flex justify-center items-center text-center  ">
                  <FontAwesomeIcon icon={faLock} className="text-primary" />
                </div>
                <div className={`${isHomePage ? "" : "text-primary"}`}>
                  Sign in
                </div>
              </div>
            )}
            <div
              className={`cursor-pointer ${
                isHomePage ? "" : "text-primary"
              } xl:block hidden`}
              onClick={() => setOpenUploadModal(true)}
            >
              Upload
            </div>
          </div>
        </div>

        {openAuthModal && (
          <AuthenticationModal modalHandler={setOpenAuthModal} />
        )}

        {openUploadModal && user && (
          <UploadModal modalHandler={setOpenUploadModal} />
        )}
        {showFavoritesModal && (
          <FavoritesModal
            showModal={(visible) => {
              setShowFavoritesModal(visible);
            }}
            showFavoritesModal={showFavoritesModal}
          />
        )}
      </header>
    </>
  );
};

export default AdminNavbar;
