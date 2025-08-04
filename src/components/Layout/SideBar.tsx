import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DownloadIcon from "@mui/icons-material/Download";
import StyleIcon from "@mui/icons-material/Style";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import SideBarLink from "./SideBarLink";
import { MenuItem, Select } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useTrans } from "@/utils/translation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

const SideBar = () => {
  const location = useLocation();

  const [hoverState, setHoverState] = useState(false);

  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);

  return (
    <>
      <div className="lg:hidden block h-[70x] pt-[70px] mx-4 ">
        <Select
          id="simple-navigator"
          value={location.pathname}
          displayEmpty
          className="w-full "
        >
          <MenuItem value={`/${local}/my-account`}>
            <NavLink to={`/${local}/my-account`}>
              {t("siderbar.dashboard")}
            </NavLink>
          </MenuItem>
          <MenuItem value={`/${local}/my-account/listings`}>
            <NavLink to={`/${local}/my-account/listings`}>
              {t("siderbar.listings")}
            </NavLink>
          </MenuItem>
          <MenuItem value={`/${local}/my-account/downloads`}>
            <NavLink to={`/${local}/my-account/listings`}>
              {t("siderbar.downloads")}
            </NavLink>
          </MenuItem>
          <MenuItem value={`/${local}/my-account/messages`}>
            <NavLink to={`/${local}/my-account/messages`}>
              {t("siderbar.messages")}
            </NavLink>
          </MenuItem>
          <MenuItem value={`/${local}/my-account/notification`}>
            <NavLink to={`/${local}/my-account/notification`}>
              {t("siderbar.notiifcations")}
            </NavLink>
          </MenuItem>
          <MenuItem value={`/${local}/my-account/account-details`}>
            <NavLink to={`/${local}/my-account/account-details`}>
              {t("siderbar.account_details")}
            </NavLink>
          </MenuItem>
          <MenuItem value={30}>
            <div>{t("siderbar.logout")}</div>
          </MenuItem>
        </Select>
      </div>
      <div className="lg:flex hidden fixed left-0 top-[70px] bottom-0 w-[60px] bg-white flex-col items-center justify-start py-6 shadow-md gap-6 z-10">
        <SideBarLink
          title={t("sidebar.dashboard")}
          route={`/${local}/my-account`}
          element={<DashboardIcon className="!text-[20px]" />}
        />
        <SideBarLink
          title={t("sidebar.listings")}
          route={`/${local}/my-account/listings`}
          element={<LocationOnIcon className="!text-[20px]" />}
        />
        <SideBarLink
          title={t("sidebar.downloads")}
          route={`/${local}/my-account/downloads`}
          element={<DownloadIcon className="!text-[20px]" />}
        />
        <SideBarLink
          title={t("sidebar.messages")}
          route={`/${local}/my-account/messages`}
          element={<MessageIcon className="!text-[20px]" />}
        />
        <SideBarLink
          title={t("sidebar.notifications")}
          route={`/${local}/my-account/notification`}
          element={<NotificationsIcon className="!text-[20px]" />}
        />
        <SideBarLink
          title={t("sidebar.account_details")}
          route={`/${local}/my-account/account-details`}
          element={<i className="fa-solid fa-user  !text-[15px]" />}
        />
        <div
          onMouseEnter={() => setHoverState(true)}
          onMouseLeave={() => setHoverState(false)}
          className=" w-full relative flex items-center justify-center bg-white"
        >
          <LockIcon className="!text-[20px] !text-[#d55252]" />
          <div
            style={{
              width: "max-content",
            }}
            className={`absolute -z-50 ${
              hoverState ? "left-[60px] " : "left-0 opacity-0"
            } top-0 bottom-0 transition-all duration-300 text-[14px] font-semibold rounded-r-md  px-4 min-w-fit  bg-black  text-white flex items-center justify-center`}
          >
            {t("sidebar.logout")}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
