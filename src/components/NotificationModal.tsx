import { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { Chat } from "@/models/Chat";
import { Notification } from "@/models/notification";
import { useTrans } from "@/utils/translation";

const NotificationModal = ({
  openModal,
  modalHandler,
  notifications,
  chats,
}: {
  openModal: boolean;
  modalHandler: (b: boolean) => void;
  notifications: Notification[];
  chats: Chat[];
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [selectedType, setSelectedType] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        openModal
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

  const { t } = useTrans();

  return (
    <div
      ref={modalRef}
      className="absolute top-full z-30 mt-2 bg-[#ffffff] end-0 rounded-lg shadow-lg w-96   text-black !text-md font-semibold"
    >
      <div className="   rounded-t-lg">
        <Tabs
          sx={{
            "& .MuiTabs-flexContainer": {
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontFamily: "HelveticaNeue, sans-serif",
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#111111",
            },
            fontFamily: "HelveticaNeue, sans-serif",
          }}
          className="w-full flex justify-evenly mb-4 items-center border-b-2 border-gray-200"
          value={selectedType}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            key={0}
            className="whitespace-nowrap mr-4 text-sm  font-bold"
            sx={{
              color: selectedType === 0 ? "#111111 !important" : "#6b7280",
              borderBottomColor:
                selectedType === 0 ? "#111111 !important" : "#6b7280",
              fontWeight: 700,
            }}
            label={t("notification_modal.notifications")}
            onClick={() => {
              setSelectedType(0);
            }}
          />
          <Tab
            key={1}
            className="whitespace-nowrap mr-4 text-sm  font-bold"
            sx={{
              color: selectedType === 1 ? "#111111 !important" : "#6b7280",
              borderBottomColor:
                selectedType === 1 ? "#111111 !important" : "#6b7280",
              fontWeight: 700,
            }}
            label={t("notification_modal.messages")}
            onClick={() => {
              setSelectedType(1);
            }}
          />
        </Tabs>
      </div>
      <div className="min-h-80 max-h-80 overflow-x-auto">
        {selectedType == 0 &&
          (notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                className={`${
                  notification.is_read
                    ? "border-l-gray-400"
                    : "border-l-blue-400"
                }  border-l-4 mx-1 my-2 p-3`}
              >
                <div className="font-semibold">{notification.title}</div>
                <div className="font-normal text-sm line-clamp-1 text-ellipsis">
                  {notification.body}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-md font-normal">
              {t("notification_modal.no_notifications")}
            </div>
          ))}
        {selectedType == 1 &&
          (chats.length > 0 ? (
            chats.map((chat) => (
              <div
                className={`${
                  chat.last_message.is_read
                    ? "border-l-gray-400"
                    : "border-l-blue-400"
                }  border-l-4 mx-1 my-2 p-3`}
              >
                <div className="font-semibold">{chat.peer.display_name}</div>
                <div className="font-normal text-sm line-clamp-1 text-ellipsis">
                  {chat.last_message.message}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-md font-normal">
              {t("notification_modal.no_messages")}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationModal;
