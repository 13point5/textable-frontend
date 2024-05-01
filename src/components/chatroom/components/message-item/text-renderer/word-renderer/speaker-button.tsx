import { botData } from "@/constants/bots";
import { useTTS } from "@/hooks/useTTS";
import { RoomId } from "@/lib/chat-store";
import { CircleStopIcon, Volume2Icon } from "lucide-react";

type SpeakButtonProps = { text: string; roomId: RoomId };

const SpeakButton = ({ text, roomId }: SpeakButtonProps) => {
  const voiceId = botData[roomId]?.voiceId;
  const { playing, handlePlay, handleStop } = useTTS(text, voiceId);

  return (
    <div
      onClick={playing ? handleStop : handlePlay}
      className="cursor-pointer flex gap-1 items-center bg-botMsg text-xs font-thin text-black p-[0.5]"
    >
      {playing && <CircleStopIcon className="w-3 h-3" />}

      {!playing && <Volume2Icon className="w-3 h-3" />}
    </div>
  );
};

export default SpeakButton;
