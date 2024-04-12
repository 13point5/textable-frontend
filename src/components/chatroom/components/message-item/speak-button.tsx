import { CircleStopIcon, Volume2Icon } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

type Props = { text: string };

export const SpeakButton = ({ text }: Props) => {
  const { playing, handlePlay, handleStop } = useTextToSpeech(text);

  return (
    <div
      onClick={playing ? handleStop : handlePlay}
      className="cursor-pointer flex gap-1 items-center bg-botMsg text-xs font-thin text-black p-[0.5]"
    >
      {playing && (
        <>
          <CircleStopIcon className="w-3 h-3" /> Speaking
        </>
      )}

      {!playing && (
        <>
          <Volume2Icon className="w-3 h-3" /> Speak
        </>
      )}
    </div>
  );
};
