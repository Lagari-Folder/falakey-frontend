import { RootState } from "@/lib/store";
import { apiRequest } from "@/utils/apiRequest";
import { useTrans } from "@/utils/translation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const NotificationSettingsDashboard = () => {
  // const [notificationSettings, setNotificationSettings] = useState();
  // const [loading, setLoading] = useState(true); // ✅ Loading state

  const { token } = useSelector((state: RootState) => state.auth);
  const { t } = useTrans();

  useEffect(() => {
    apiRequest({
      method: "GET",
      url: "notification-settings",
      withLocale: true,
      token: token!,
    }).then((result) => {
      console.log(result);
    });
  }, [token]);

  return (
    <div className="">
      {/* Title */}
      <h1 className="text-[30px] font-bold font-lexend text-start mb-10 flex justify-between">
        <span>{t("sidebar.notification-settings")}</span>
      </h1>
    </div>
  );
};

export default NotificationSettingsDashboard;
