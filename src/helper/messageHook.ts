import { RootState } from "@/lib/store";
import { Message } from "@/models/Message";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

export const useMessageHook = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const { token, user } = useSelector((state: RootState) => state.auth);
  const { local } = useSelector((state: RootState) => state.translation);

  const getMessages = async (
    peerId: number | undefined,
    postId: number | null
  ) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL +
          `chats/messages/${peerId}${
            postId != null ? `/${postId}` : ""
          }?locale=${local}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data["success"]) {
        setMessages(response.data["data"]);
      } else {
        setError(response.data["message"]);
      }
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (
    message: string,
    receiverId: number | undefined,
    postId: number | undefined
  ) => {
    setError("");
    try {
      const newMessage = {
        id: 12,
        created_at: "now",
        is_read: false,
        sender: user,
        message: message,
      } as Message;
      setMessages((prevMessage) => [newMessage, ...prevMessage]);

      await axios.post(
        import.meta.env.VITE_BASE_URL + `chats/send?locale=${local}`,
        {
          receiver_id: receiverId,
          post_id: postId,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch {
      setError("Error Happend While Sending the Message");
    }
  };

  return { getMessages, sendMessage, messages, loading, error };
};
