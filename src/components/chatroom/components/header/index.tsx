import { Button } from "@/components/ui/button";
import { botData } from "@/constants/bots";
import { RoomId } from "@/lib/chat-store";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";

type Props = {
  roomId: RoomId;
  onBackClick: () => void;
};

export const Header = ({ roomId, onBackClick }: Props) => {
  return (
    <div className="w-full flex justify-between items-center p-2 bg-white border-b h-15">
      <Button onClick={onBackClick} size="icon" variant="ghost">
        <ChevronLeftIcon />
      </Button>

      <p className="text-xl font-medium font-h2">
        {botData[roomId]?.name || "Bot"}
      </p>

      <Button size="icon" variant="ghost">
        <MenuIcon />
      </Button>
    </div>
  );
};
