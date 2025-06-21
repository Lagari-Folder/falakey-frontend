import { TextareaAutosize, Tooltip } from "@mui/material";
import { Button } from "./ui/button";
import ImageIcon from "@mui/icons-material/Image";
import { useEffect, useState } from "react";
import { useMessageHook } from "@/helper/messageHook";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useTrans } from "@/utils/translation";

const MessageModal = ({
  showModal,
  peerId,
  postId,
}: {
  showModal: (b: boolean) => void;
  peerId: number | undefined;
  postId: number | undefined;
}) => {
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { getMessages, sendMessage, messages } = useMessageHook();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setLoading(true);
    // Function to fetch messages
    getMessages(peerId, postId ?? null).then(() => {
      setLoading(false);
    });

    const fetchMessages = () => {
      getMessages(peerId, postId ?? null);
    };

    // Set an interval to call the function every 5 seconds
    const interval = setInterval(fetchMessages, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const { t } = useTrans();

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-95 flex justify-center items-center z-50 p-10 pr-7 pl-7"
      onClick={() => showModal(false)}
    >
      {loading ? (
        <div className="bg-white p-3 rounded-[12px]  w-[35%] flex items-center gap-5">
          <div className="flex justify-center animate-pulse duration-1000 ease-out items-center bg-[#ccc] size-[70px] rounded-[6px]">
            <ImageIcon className="text-[#999] !text-[18px]" />
          </div>
          <div className="h-full animate-pulse duration-1000 ease-out flex-1 space-y-3">
            <div className="h-[14px]  bg-[#ccc] rounded-sm"></div>
            <div className="h-[14px] w-full flex space-x-3">
              <div className="w-[60%] h-full bg-[#ccc] rounded-sm"></div>
              <div className="w-[30%] h-full bg-[#ccc] rounded-sm"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-[550px]  bg-white py-6 rounded-md shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mx-6">
            <div className="text-lg flex-1 font-bold">
              {t("message_modal.send_message")}
            </div>
            <Button
              className="bg-custom-gray text-black font-semibold text-md hover:text-white"
              onClick={() => showModal(false)}
            >
              {t("common.close")}
            </Button>
          </div>
          <div className="w-full h-[2px] bg-custom-gray my-3"></div>

          {messages.length > 0 ? (
            <div className="w-full flex flex-col-reverse max-h-[300px] overflow-x-auto gap-4 my-4">
              {messages.map((message) => (
                <div
                  className={`mx-3 ${
                    message.sender.id == user?.id ? "ml-auto" : " "
                  }`}
                >
                  <div
                    className={`flex items-end gap-2 ${
                      message.sender.id == user?.id ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Tooltip title={message.sender.display_name}>
                      <img
                        className="size-[25px] mb-[16px] rounded-full"
                        src={message.sender.avatar}
                        alt={message.sender.display_name}
                      />
                    </Tooltip>
                    <div>
                      <div
                        key={message.id}
                        className={`${
                          message.sender.id == user?.id
                            ? "bg-gray-300 rounded-br-none"
                            : "bg-gray-200 rounded-bl-none"
                        } py-2 px-3 rounded-md  shadow-sm `}
                      >
                        {message.message}
                      </div>
                      <div
                        className={`text-xs w-fit mt-0.5 text-gray-300 ${
                          message.sender.id == user?.id ? "ml-auto" : ""
                        }`}
                      >
                        {message.created_at}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">{t("message_modal.no_messages")}</div>
          )}

          <div className="w-full h-[2px] bg-custom-gray my-3"></div>
          <div className="flex gap-4 mx-4 justify-center items-start">
            <TextareaAutosize
              className="w-full border border-custom-gray rounded-md px-1 py-3"
              placeholder={t("message_modal.message_placeholder")}
              value={messageInput}
              onChange={(e) => {
                setMessageInput(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (messageInput.trim() !== "") {
                  sendMessage(messageInput, peerId!, postId);
                  setMessageInput("");
                }
              }}
              className="bg-custom-gray text-black font-semibold text-md hover:text-white"
            >
              {t("message_modal.send")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageModal;
