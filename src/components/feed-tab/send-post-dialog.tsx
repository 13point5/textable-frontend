import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { botData } from "@/constants/bots";
import useChatStore, { RoomId } from "@/lib/chat-store";
import useHomeStore from "@/lib/home-store";
import { convertImageToBase64 } from "@/lib/utils";
import { Tabs } from "@/types";
import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";

export const SendPostDialog = () => {
  const dialogData = useHomeStore((state) => state.sendPostDialog);
  const onDialogOpenChange = useHomeStore(
    (state) => state.onSendPostDialogOpenChange
  );
  const setActiveTab = useHomeStore((state) => state.setActiveTab);

  const [recipientRoomId, setRecipientRoomId] = useState<RoomId | null>(null);

  const chat = useChatStore((state) => state.chat);
  const setSelectedRoomId = useChatStore((state) => state.setSelectedRoomId);

  const [message, setMessage] = useState("");

  const disabled = !recipientRoomId || !message;
  const img = dialogData.data?.content;

  const handleMessageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (disabled || !img) return;

    const imgBase64 = await convertImageToBase64(img);

    chat(recipientRoomId, message, img ? [imgBase64] : []);
    setSelectedRoomId(recipientRoomId);
    setActiveTab(Tabs.Chat);
    onDialogOpenChange(false);
  };

  return (
    <Dialog open={dialogData.isOpen} onOpenChange={onDialogOpenChange}>
      <DialogContent className="w-[80%] rounded-md">
        <DialogHeader>
          <DialogTitle>Send Post to your Friends</DialogTitle>
          <DialogDescription className="flex flex-col gap-6 items-center">
            <img
              src={dialogData.data?.content}
              alt="Meme"
              className="w-auto h-40"
            />

            <div className="flex gap-4">
              {Object.entries(botData).map(([botId, bot]) => (
                <ContactItemV2
                  key={botId}
                  id={botId}
                  onSelect={setRecipientRoomId}
                  selected={recipientRoomId === botId}
                  name={bot.name}
                  avatar={bot.avatar}
                />
              ))}
            </div>

            <Input
              value={message}
              onChange={handleMessageInputChange}
              placeholder="Type your message here"
              autoFocus={false}
            />

            <Button
              onClick={handleSendMessage}
              disabled={disabled}
              className="w-full"
            >
              Send Post
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

type ContactItemProps = {
  id: string;
  name: string;
  avatar: string;
  selected: boolean;
  onSelect: (id: string) => void;
};

const ContactItemV2 = ({
  name,
  avatar,
  id,
  selected,
  onSelect,
}: ContactItemProps) => {
  return (
    <div
      className="flex flex-col gap-2 items-center relative"
      onClick={() => onSelect(id)}
    >
      <div className="relative">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />

        {selected && (
          <CircleCheckIcon
            className="absolute -bottom-2 -right-2 text-blue-500 fill-current"
            color="#FFF"
          />
        )}
      </div>
      <span>{name}</span>
    </div>
  );
};
