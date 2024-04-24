import { MessageItem } from "@/components/chatroom/components/message-item";
import useChatStore, { RoomId } from "@/lib/chat-store";

type Props = {
  roomId: RoomId;
};

export const MessageList = ({ roomId }: Props) => {
  const messages = useChatStore((state) => state.getMessagesByRoomId(roomId));

  return (
    <div className="flex-1 flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4 overflow-auto">
        {messages.map((message) => (
          <MessageItem
            roomId={roomId}
            key={message.id}
            message={message.content}
            role={message.role}
            feedback={message.feedback}
          />
        ))}
      </div>
    </div>
  );
};
