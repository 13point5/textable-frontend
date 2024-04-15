import { Header } from "@/components/chatroom/components/header";
import { MessageComposer } from "@/components/chatroom/components/message-composer";
import { MessageList } from "@/components/chatroom/components/message-list";
import { useEffect } from "react";
import useChatStore, { RoomId } from "@/lib/chat-store";
import { nanoid } from "nanoid";
import { MessageRole } from "@/lib/types";

const roomId: RoomId = "pierre-chatroom";

export const Chatroom = () => {
  const addMessage = useChatStore((state) => state.addMessage);

  useEffect(() => {
    addMessage(roomId, {
      id: nanoid(),
      role: MessageRole.AI,
      content: "Salut! Tu as fait quoi aujourd’hui?",
      feedback: null,
    });
  }, []);

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto pt-16 pb-20">
        <MessageList roomId={roomId} />
      </div>

      <div className="fixed bottom-0 w-full z-10">
        <MessageComposer roomId={roomId} />
      </div>
    </div>
  );
};
