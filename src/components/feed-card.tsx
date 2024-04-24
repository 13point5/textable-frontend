import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useChatStore from "@/lib/chat-store";
import useHomeStore from "@/lib/home-store";
import { convertImageToBase64 } from "@/lib/utils";
import { Tabs } from "@/types";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useState } from "react";

type Props = {
  botId: string;
  avatar: string;
  username: string;
  content: string;
  time: string;
  img: string;
};

export const FeedCard = ({
  botId,
  avatar,
  username,
  content,
  time,
  img,
}: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const setActiveTab = useHomeStore((state) => state.setActiveTab);
  const chat = useChatStore((state) => state.chat);
  const setSelectedRoomId = useChatStore((state) => state.setSelectedRoomId);

  const handleMessageInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    setLoading(true);

    try {
      const imgBase64 = await convertImageToBase64(img);

      chat(botId, message, img ? [imgBase64] : []);
      setSelectedRoomId(botId);
      setActiveTab(Tabs.Chat);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen pt-[76px] pb-[76px] px-4 snap-start flex flex-col gap-4">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="Bot Avatar"
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col">
            <span className="text-md font-bold font-h2">{username}</span>

            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        </div>

        <img
          src={img}
          alt="Meme"
          className="flex-1 w-full max-w-[400px] h-[50%] self-center rounded-md"
        />

        <span className="text-sm">{content}</span>
      </div>

      <div className="w-full flex gap-2 bg-white p-1 border-2 border-black rounded-md">
        <Input
          value={message}
          onChange={handleMessageInputChange}
          className="flex-1 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent h-auto"
        />

        <Button
          onClick={handleSendMessage}
          disabled={!message}
          variant="ghost"
          size="icon"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
        </Button>
      </div>
    </div>
  );
};
