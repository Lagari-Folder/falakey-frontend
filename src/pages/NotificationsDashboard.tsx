import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import user_def from "../../public/icons/user-solid.svg";
import { Notification } from "@/models/notification";
import { useTrans } from "@/utils/translation";
import { apiRequest } from "@/utils/apiRequest";

const NotificationsDashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const { token } = useSelector((state: RootState) => state.auth);
  const { t } = useTrans();

  useEffect(() => {
    setLoading(true); // ✅ Start loading
    apiRequest({
      method: "GET",
      url: "notifications",
      withLocale: true,
      token: token!,
    }).then((result) => {
      if (result.success) {
        setNotifications(result.data.data.notifications.list);
      }
      setLoading(false); // ✅ End loading
    });
  }, [token]);

  return (
    <div className="">
      {/* Title */}
      <h1 className="text-[30px] font-bold font-lexend text-start mb-10 flex justify-between">
        <span>{t("sidebar.notifications")}</span>
        <a
          href="/my-account/notification-settings"
          className="bg-primary text-white hover:bg-primary/80 py-1 px-2 text-[20px] rounded-md flex items-center justify-center "
        >
          {t("common.settings")}
        </a>
      </h1>

      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden min-w-[600px]">
        {loading ? (
          <div className="text-gray-400 text-sm text-center py-6 animate-pulse">
            {t("loading") || "Loading..."}
          </div>
        ) : notifications?.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-6">
            {t("no_notifications") || "No notifications to show."}
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={`flex items-center justify-between border-b ${
                notification.is_read ? "" : "bg-[#eff6ff]"
              } border-gray-200 py-5 last:border-none cursor-pointer px-5`}
            >
              {/* Profile and Message Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-[40px] h-[40px] rounded-full bg-black flex items-center justify-center">
                  <img
                    className="w-[10px] h-[10px] object-contain"
                    src={user_def}
                    alt="Default Profile"
                  />
                </div>
                <div className="pl-3">
                  <p className="font-semibold text-[14px]">
                    {notification.title}
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {notification.body}
                  </p>
                  <p className="text-[11px] text-gray-300">
                    {notification.created_at}
                  </p>
                </div>
              </div>
              {!notification.is_read && (
                <div className="size-[10px] animate-pulse bg-blue-500 rounded-full"></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsDashboard;
