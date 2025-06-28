import { faCaretRight, faUser } from "@fortawesome/free-solid-svg-icons";
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

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTrans();
  const { local } = useSelector((state: RootState) => state.translation);
  const navigate = useNavigate();

  return (
    <div className="sm:px-8 md:px-12 xl:px-16">
      {/* Title */}
      <h1 className="text-[24px] sm:text-[28px] md:text-[30px] font-semibold font-lexend text-left mb-6">
        {t("dashboard.title")}
      </h1>

      {/* Profile Card */}
      <div className="w-full bg-primary rounded-lg p-8 space-y-6">
        <div className="flex justify-between">
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
            className="bg-white h-[35px] flex items-center justify-center py-3 px-4 rounded-md hover:bg-slate-100 font-semibold text-md"
          >
            {t("dashboard.view_profile")}{" "}
            <FontAwesomeIcon icon={faCaretRight} />
          </a>
        </div>
        <div className="text-white font-bold text-3xl">
          {user?.display_name}
        </div>
      </div>

      {/* Credits Section */}
      <div className="my-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-300 p-5 rounded-lg">
        <div className="text-xl font-semibold">
          {t("dashboard.credits")}:{" "}
          <span className="text-primary font-bold">{user?.credits ?? 0}</span>
        </div>
        <button
          onClick={() => navigate(`/${local}/my-account/plans`)}
          className="bg-primary text-white px-5 py-2 rounded-md font-semibold hover:bg-opacity-90"
        >
          {t("dashboard.view_plans")}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap items-center gap-x-4">
        <DasshboardCard
          icon={<RemoveRedEyeIcon />}
          title={t("dashboard.views")}
          value="0"
        />
        <DasshboardCard
          icon={<TimelineIcon />}
          title={t("dashboard.total_downloads")}
          value="0"
        />
        <DasshboardCard
          icon={<AccountBalanceWalletIcon />}
          title={t("dashboard.total_favorites")}
          value="0"
        />
      </div>

      {/* Bar Chart */}
      <BarChart
        xAxis={[
          {
            id: "barCategories",
            data: [
              "11 Dec",
              "12 Dec",
              "13 Dec",
              "14 Dec",
              "15 Dec",
              "16 Dec",
              "17 Dec",
              "18 Dec",
              "19 Dec",
              "20 Dec",
              "21 Dec",
              "22 Dec",
              "23 Dec",
              "24 Dec",
              "25 Dec",
              "26 Dec",
              "27 Dec",
              "28 Dec",
              "29 Dec",
              "30 Dec",
              "31 Dec",
              "01 Jan",
              "02 Jan",
              "03 Jan",
              "04 Jan",
              "05 Jan",
              "06 Jan",
              "07 Jan",
              "08 Jan",
              "09 Jan",
            ],
            scaleType: "band",
          },
        ]}
        series={[{ data: new Array(35).fill(0) }]}
        height={300}
        className="border rounded-md"
      />

      {/* Dashboard Links */}
      <div className="flex flex-wrap items-center gap-4">
        <DashboardLink
          icon={<LocationOnIcon />}
          title={t("dashboard.listings")}
          description={t("dashboard.listings_description")}
          link={`/${local}/my-account/listings`}
        />
        <DashboardLink
          icon={<MessageIcon />}
          title={t("dashboard.messages")}
          description={t("dashboard.messages_description")}
          link={`/${local}/my-account/messages`}
        />
        <DashboardLink
          icon={<NotificationsIcon />}
          title={t("dashboard.notifications")}
          description={t("dashboard.notifications_description")}
          link={`/${local}/my-account/notification-settings`}
        />
      </div>
    </div>
  );
};

const DasshboardCard = ({
  icon,
  title,
  value,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
}) => {
  return (
    <div className="min-w-[300px] my-5 p-5 border border-gray-300 rounded-lg flex gap-3 flex-1">
      <div className="bg-black flex justify-center items-center text-white rounded-md size-[50px]">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="font-bold text-xl">{value}</div>
      </div>
    </div>
  );
};

const DashboardLink = ({
  icon,
  title,
  description,
  link,
}: {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
}) => {
  return (
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
