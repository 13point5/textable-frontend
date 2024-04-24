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
    <div className="h-screen overflow-hidden bg-bg1">
      <div className="fixed top-0 w-full z-10">
        <Header roomId={id} onBackClick={handleBackClick} />
      </div>

      <div className="h-screen overflow-y-auto pt-[60px] pb-[120px]">
        <MessageList roomId={id} />
      </div>

      <div className="w-full z-10 fixed bottom-[60px]">
        <MessageComposer roomId={id} />
      </div>
    </div>
  );
};
