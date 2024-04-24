import { Chatroom } from "@/components/chatroom";
import useChatStore from "@/lib/chat-store";
import { RoomPreviewItem } from "@/components/chat-tab/room-preview-item";

const ChatTab = () => {
  const { selectedRoomId, setSelectedRoomId, roomPreviews } = useChatStore(
    (state) => ({
      selectedRoomId: state.selectedRoomId,
      setSelectedRoomId: state.setSelectedRoomId,
      roomPreviews: state.getRoomPreviews(),
    })
  );

  if (selectedRoomId)
    return <Chatroom id={selectedRoomId} onChatChange={setSelectedRoomId} />;

  return (
    <div className="flex flex-col gap-4 bg-bg1 h-screen max-h-screen pb-[60px]">
      <div className="flex items-center justify-center p-2 bg-white border-b h-15">
        <h1 className="text-2xl font-h1 mt-2">Messages</h1>
      </div>

      <div className="flex flex-col">
        {roomPreviews.map((roomPreview) => (
          <RoomPreviewItem key={roomPreview.id} {...roomPreview} />
        ))}
      </div>
    </div>
  );
};

export default ChatTab;
