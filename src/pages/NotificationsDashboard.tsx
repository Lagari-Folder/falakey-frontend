import { getNotifications } from "@/helper/userHook";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import user_def from "../../public/icons/user-solid.svg";
import { Notification } from "@/models/notification";
import { useTrans } from "@/utils/translation";

const NotificationsDashboard = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    getNotifications(token ?? "").then((result) => {
      if (result[0]) {
        setNotifications(result[1]["general"]);
      }
    });

  }, [token]); // ✅ FIXED: use [token] instead of [notifications] to avoid infinite loop

  const { t } = useTrans();

  return (
    <div className="">
      {/* Title */}
      <h1 className="text-[30px] font-bold font-lexend text-left mb-10">
        {t("sidebar.notifications")}
      </h1>

      <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
        {notifications?.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-6">
            {t("no_notifications") || "No notifications to show."}
          </div>
        ) : (
          notifications?.map((notification, index) => (
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
