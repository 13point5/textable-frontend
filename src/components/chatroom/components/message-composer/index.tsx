import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import useChatStore, { RoomId } from "@/lib/chat-store";
import { Message, MessageRole } from "@/lib/types";
import { nanoid } from "nanoid";
import { useState } from "react";
import { axiosInstance } from "@/api/axios";

type Props = {
  roomId: RoomId;
};

export const MessageComposer = ({ roomId }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const [loading, setLoading] = useState(false);

  const { addMessage, addBotResponseAndFeedback, messages } = useChatStore(
    (state) => ({
      messages: state.getMessagesByRoomId(roomId),
      addMessage: state.addMessage,
      addBotResponseAndFeedback: state.addBotResponseAndFeedback,
    })
  );
  console.log("1 messages", messages);

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const newMessage: Message = {
        id: nanoid(),
        content: inputValue,
        role: MessageRole.HUMAN,
        feedback: null,
      };

      addMessage(roomId, newMessage);
      setInputValue("");

      console.log("2 messages", messages);

      const res = await axiosInstance.post("/chat", {
        messages: [...messages, newMessage],
      });
      console.log("res", res);

      addBotResponseAndFeedback(roomId, res.data.response, res.data.feedback);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex gap-2 items-center p-2 bg-slate-50"
    >
      <input
        value={inputValue}
        onChange={handleInputValueChange}
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 bg-slate-50 rounded-lg"
      />

      <Button type="submit" disabled={loading} variant="default" size="icon">
        {loading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <ArrowRightIcon />
        )}
      </Button>
    </form>
  );
};
