import RedBot from "@/assets/red-avatar.svg";
import GreenBot from "@/assets/green-avatar.svg";
import PurpleBot from "@/assets/purple-bot.svg";
import { Chatroom } from "@/components/chatroom";
import useChatStore from "@/lib/chat-store";
import { botData } from "@/constants/bots";

const ChatTab = () => {
  const { selectedRoomId, setSelectedRoomId } = useChatStore((state) => ({
    selectedRoomId: state.selectedRoomId,
    setSelectedRoomId: state.setSelectedRoomId,
  }));

  if (selectedRoomId)
    return <Chatroom id={selectedRoomId} onChatChange={setSelectedRoomId} />;

  return (
    <div className="flex-1 flex flex-col gap-4 bg-bg1">
      <div className="flex items-center justify-center p-2 bg-white border-b h-15">
        <h1 className="text-2xl font-h1 mt-2">Messages</h1>
      </div>

      <div className="flex flex-col">
        <MessagePreviewItem
          id="redbot"
          onClick={setSelectedRoomId}
          avatar={RedBot}
          message="Salut! Tu as fait quoi aujourd’hui?"
          time="10:02 AM"
        />

        <MessagePreviewItem
          id="greenbot"
          onClick={setSelectedRoomId}
          avatar={GreenBot}
          message="Salut! Tu as fait quoi aujourd’hui?"
          time="5:43 PM"
        />

        <MessagePreviewItem
          id="purplebot"
          onClick={setSelectedRoomId}
          avatar={PurpleBot}
          message="Salut! Tu as fait quoi aujourd’hui?"
          time="9:29 PM"
        />
      </div>
    </div>
  );
};

export default ChatTab;

type MessagePreviewItemProps = {
  id: string;
  onClick: (id: string) => void;
  avatar: string;
  message: string;
  time: string;
};

const MessagePreviewItem = ({
  id,
  onClick,
  avatar,
  message,
  time,
}: MessagePreviewItemProps) => {
  const name = botData[id]?.name || "Bot";

  return (
    <div
      onClick={() => onClick(id)}
      className="w-full flex gap-2 cursor-pointer hover:bg-slate-100"
    >
      <img src={avatar} alt="Red Bot" className="w-12 h-12 pl-2 py-2" />

      <div className="flex-1 flex flex-col gap-2 border-b py-2 px-2">
        <div className="w-full flex gap-2 items-center justify-between">
          <span className="text-md font-h2">{name}</span>

          <span className="text-sm text-muted-foreground">{time}</span>
        </div>

        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};
