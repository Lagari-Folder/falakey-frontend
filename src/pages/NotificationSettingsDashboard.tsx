import { RootState } from "@/lib/store";
import { apiRequest } from "@/utils/apiRequest";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type SettingItem = {
  key: string;
  enabled: number; // 1 or 0
};

type NotificationSetting = {
  [channel: string]: SettingItem[];
};

const titles: Record<string, string> = {
  message: "Message Notifications",
  post_status_changed: "Post Status Changed",
  // Add more human-readable titles here
};

const NotificationSettingsDashboard = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [settings, setSettings] = useState<NotificationSetting>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    apiRequest({
      method: "GET",
      url: "notification-settings",
      withLocale: true,
      token,
    }).then((result) => {
      setLoading(false);
      if (result.success) {
        setSettings(result.data["data"] || {});
      } else {
        setError(result.error || "Failed to load notification settings");
      }
    });
  }, [token]);

  const toggleNotification = (channel: string, key: string) => {
    setSettings((prev) => {
      const updatedChannel =
        prev[channel]?.map((item) =>
          item.key === key ? { ...item, enabled: item.enabled ? 0 : 1 } : item
        ) || [];
      return { ...prev, [channel]: updatedChannel };
    });
  };

  const saveSettings = () => {
    if (!token) return;
    setSaving(true);
    setError(null);

    const payload = {
      settings: Object.entries(settings).flatMap(([channel, items]) =>
        items.map(({ key, enabled }) => ({
          channel_key: channel,
          type_key: key,
          enabled: enabled,
        }))
      ),
    };

    apiRequest({
      method: "POST",
      url: "notification-settings",
      withLocale: false,
      token,
      data: payload,
      showSuccess: true,
      showError: true,
      customSuccessMessage: "Settings saved",
    }).then((result) => {
      setSaving(false);
      if (!result.success) {
        setError(result.error || "Failed to save notification settings");
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-[30px] font-bold font-lexend mb-10">
        Notification Settings
      </h1>

      {Object.entries(settings).map(([channel, items]) => (
        <div key={channel} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 capitalize">
            {channel} Channel
          </h2>
          <div className="space-y-4">
            {items.map(({ key, enabled }) => (
              <div
                key={key}
                className="flex items-center justify-between border p-4 rounded-md"
              >
                <span>{titles[key] || key}</span>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={enabled === 1}
                    onChange={() => toggleNotification(channel, key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary transition-colors"></div>
                  <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-full"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={saveSettings}
        disabled={saving}
        className={`mt-8 px-6 py-3 rounded-md text-white font-semibold ${
          saving
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary/80"
        }`}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default NotificationSettingsDashboard;
