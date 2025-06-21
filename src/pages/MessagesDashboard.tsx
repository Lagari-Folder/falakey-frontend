import { useEffect, useState } from "react";
import MessageModal from "../components/MessageModal";
import { useChatHook } from "@/helper/chatHook";
import unkownProf from "../../public/images/unkown-profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Chat } from "@/models/Chat";
import { useTrans } from "@/utils/translation";
import { User } from "@/models/user";

const MessagesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat>();

  const { getChats, chats, loading } = useChatHook();

  useEffect(() => {
    getChats();
  }, []);

  const handleShowModal = (chat: Chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const { t } = useTrans();

  return (
    <div className="">
      {/* Title */}
      <h1 className="text-[30px] font-bold font-lexend text-left mb-10">
        {t("messages_dashboard.title")}
      </h1>

      {loading ? (
        <div className="mt-6 mb-12 flex items-center justify-center gap-3 text-xl font-semibold text-primary">
          <FontAwesomeIcon
            icon={faSpinner}
            className="size-[30px] animate-spin"
            style={{ animationDuration: "2000ms" }}
          />
          {t("common.loading")}
        </div>
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg py-1 px-5 ">
          {chats!.map((chat: Chat) => (
            <div
              key={chat.id}
              className="flex items-center justify-between border-b border-gray-200 py-3 last:border-none cursor-pointer h-[80px]"
              onClick={() => handleShowModal(chat)} // Opens modal on row click
            >
              <div className="flex items-center gap-4 h-full">
                <div className="relative size-[45px] rounded-full bg-black flex items-center justify-center ">
                  {!chat.last_message.is_read && (
                    <span className="absolute top-0 right-0 w-[12px] h-[12px] bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                  {chat.peer ? (
                    <img
                      className="size-full object-cover rounded-full"
                      src={chat.peer.avatar}
                      alt={chat.peer.display_name || "Profile Picture"}
                    />
                  ) : (
                    <img
                      className="size-full rounded-full object-cover"
                      src={unkownProf}
                      alt={(chat.peer as User).display_name! ?? "Profile Picture"}
                    />
                  )}
                </div>

                <div className="pl-3">
                  <p className="font-semibold text-[14px]">
                    {chat.peer.display_name || chat.peer.username}
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {chat.last_message.created_at}
                  </p>
                </div>
              </div>

              {chat.post && (
                <img
                  className="size-[45px] object-cover rounded-md aspect-square"
                  src={chat.post?.preview_links?.thumb}
                  alt={chat.post.title}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <MessageModal
          peerId={selectedChat?.peer.id}
          postId={selectedChat?.post?.id}
          showModal={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default MessagesDashboard;
