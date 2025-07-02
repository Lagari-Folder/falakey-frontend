import {
  faCaretRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { BarChart } from "@mui/x-charts/BarChart";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";
import { useDashboardHook } from "@/helper/dashboardHook";
import { useEffect } from "react";
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);
  const navigate = useNavigate();

  const { getDashboardData, data, loading } = useDashboardHook();

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="sm:px-8 md:px-12 xl:px-16">
      <h1 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold font-lexend text-left mb-6">
        {t("dashboard.title")}
      </h1>

      {loading ? (
        <div className="space-y-6 animate-pulse">
          <Skeleton
            variant="rounded"
            className="rounded-lg"
            width="100%"
            height={150}
          />
          <Skeleton
            variant="rounded"
            className="rounded-lg"
            width="100%"
            height={80}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                className="rounded-lg"
                height={120}
              />
            ))}
          </div>
          <Skeleton
            variant="rounded"
            className="rounded-lg"
            width="100%"
            height={300}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rounded"
                className="rounded-lg"
                height={150}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="w-full bg-primary rounded-lg p-8 space-y-6 text-white">
            <div className="flex justify-between items-center">
              <div className="aspect-square size-[80px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.display_name}
                    className="size-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
              <a
                href={`/author/${user?.username}`}
                className="bg-white h-[35px] flex items-center justify-center py-3 px-4 rounded-md hover:bg-slate-100 font-semibold text-md text-black"
              >
                {t("dashboard.view_profile")}{" "}
                <FontAwesomeIcon icon={faCaretRight} className="ml-2" />
              </a>
            </div>
            <div className="font-bold text-3xl">{user?.display_name}</div>
          </div>

          {/* Credits */}
          <div className="my-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-300 p-5 rounded-lg">
            <div className="text-xl font-semibold">
              {t("dashboard.credits")}:{" "}
              <span className="text-primary font-bold">
                {data?.wallet?.credits ?? 0}
              </span>
            </div>
            <button
              onClick={() => navigate(`/${local}/my-account/plans`)}
              className="bg-primary text-white px-5 py-2 rounded-md font-semibold hover:bg-opacity-90"
            >
              {t("dashboard.view_plans")}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DasshboardCard
              icon={<RemoveRedEyeIcon />}
              title={t("dashboard.views")}
              value="0"
              loading={loading}
            />
            <DasshboardCard
              icon={<TimelineIcon />}
              title={t("dashboard.total_downloads")}
              value="0"
              loading={loading}
            />
            <DasshboardCard
              icon={<AccountBalanceWalletIcon />}
              title={t("dashboard.total_favorites")}
              value="0"
              loading={loading}
            />
          </div>

          {/* Chart */}
          <BarChart
            xAxis={[
              {
                id: "barCategories",
                data: Array.from({ length: 30 }, (_, i) => `${i + 1} Jan`),
                scaleType: "band",
              },
            ]}
            series={[{ data: new Array(30).fill(0) }]}
            height={300}
            className="border rounded-md my-6"
          />

          {/* Dashboard Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DashboardLink
              icon={<LocationOnIcon />}
              title={t("dashboard.listings")}
              description={t("dashboard.listings_description")}
              link={`/${local}/my-account/listings`}
              loading={loading}
            />
            <DashboardLink
              icon={<MessageIcon />}
              title={t("dashboard.messages")}
              description={t("dashboard.messages_description")}
              link={`/${local}/my-account/messages`}
              loading={loading}
            />
            <DashboardLink
              icon={<NotificationsIcon />}
              title={t("dashboard.notifications")}
              description={t("dashboard.notifications_description")}
              link={`/${local}/my-account/notification-settings`}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

const DasshboardCard = ({
  icon,
  title,
  value,
  loading = false,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
  loading?: boolean;
}) => {
  return (
    <div className="min-w-[300px] my-5 p-5 border border-gray-300 rounded-lg flex gap-3 flex-1">
      {loading ? (
        <Skeleton variant="circular" width={50} height={50} />
      ) : (
        <div className="bg-black flex justify-center items-center text-white rounded-md size-[50px]">
          {icon}
        </div>
      )}
      <div>
        {loading ? (
          <>
            <Skeleton variant="text" width={150} height={24} />
            <Skeleton variant="text" width={80} height={32} />
          </>
        ) : (
          <>
            <div className="font-semibold">{title}</div>
            <div className="font-bold text-xl">{value}</div>
          </>
        )}
      </div>
    </div>
  );
};

const DashboardLink = ({
  icon,
  title,
  description,
  link,
  loading = false,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
  loading?: boolean;
}) => {
  return loading ? (
    <Skeleton variant="rectangular" width={300} height={150} className="my-5" />
  ) : (
    <NavLink
      to={link}
      className="my-5 min-w-[300px] p-5 border border-gray-300 rounded-lg space-y-3 flex-1"
    >
      <div className="bg-black flex justify-center items-center text-white rounded-md size-[50px]">
        {icon}
      </div>
      <div className="font-semibold">
        {title} <FontAwesomeIcon icon={faCaretRight} />
      </div>
      <div className="font-normal text-lg">{description}</div>
    </NavLink>
  );
};

export default Dashboard;
