import useChatStore from "@/lib/chat-store";
import { botData } from "@/constants/bots";
import { MessageRole, RoomPreview } from "@/lib/types";

type Props = {
  id: RoomPreview["id"];
  lastMessageId: RoomPreview["lastMessageId"];
};

export const RoomPreviewItem = ({ id, lastMessageId }: Props) => {
  const { setSelectedRoomId } = useChatStore((state) => ({
    setSelectedRoomId: state.setSelectedRoomId,
  }));

  const lastMessage = useChatStore((state) =>
    state.getMessagesByRoomId(id).find((msg) => msg.id === lastMessageId)
  );

  let message = lastMessage?.content.text || "";
  message =
    lastMessage?.role === MessageRole.HUMAN ? `You: ${message}` : message;

  const avatar = botData[id]?.avatar || "";
  const name = botData[id]?.name || "Bot";

  return (
    <div
      onClick={() => setSelectedRoomId(id)}
      className="w-full flex gap-2 cursor-pointer hover:bg-slate-100"
    >
      <img src={avatar} alt="Red Bot" className="w-12 h-12 pl-2 py-2" />

      <div className="flex-1 flex flex-col gap-2 border-b py-2 px-2">
        <div className="w-full flex gap-2 items-center justify-between">
          <span className="text-md font-h2">{name}</span>
        </div>

        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};
