import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Loader2Icon } from "lucide-react";
import useChatStore, { RoomId } from "@/lib/chat-store";

type Props = {
  roomId: RoomId;
};

export const MessageComposer = ({ roomId }: Props) => {
  const { inputValue, loading } = useChatStore((state) =>
    state.getComposerDataByRoomId(roomId)
  );
  const setComposerDataByRoomId = useChatStore(
    (state) => state.setComposerDataByRoomId
  );
  const chat = useChatStore((state) => state.chat);

  const setInputValue = (inputValue: string) =>
    setComposerDataByRoomId(roomId, { inputValue });

  const handleSendMessage: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();

    const text = inputValue;
    setInputValue("");
    await chat(roomId, text, []);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex gap-2 items-center p-2 bg-white border-t"
    >
      <input
        value={inputValue}
        onChange={handleInputValueChange}
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-lg"
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
