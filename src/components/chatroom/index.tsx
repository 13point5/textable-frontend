import { Header } from "@/components/chatroom/components/header";
import { MessageComposer } from "@/components/chatroom/components/message-composer";
import { MessageList } from "@/components/chatroom/components/message-list";
import { RoomId } from "@/lib/chat-store";

type Props = {
  id: RoomId;
  onChatChange: (roomId: RoomId | null) => void;
};

export const Chatroom = ({ id, onChatChange }: Props) => {
  const handleBackClick = () => {
    onChatChange(null);
  };

  return (
    <div className="flex flex-col flex-1 h-full max-h-full overflow-hidden relative bg-bg1">
      <div className="fixed top-0 w-full z-10">
        <Header roomId={id} onBackClick={handleBackClick} />
      </div>

      <div className="flex-1 overflow-y-auto pt-16 pb-20">
        <MessageList roomId={id} />
      </div>

      <div className="w-full z-10">
        <MessageComposer roomId={id} />
      </div>
    </div>
  );
};
