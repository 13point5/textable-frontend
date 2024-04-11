import { useState, useEffect } from "react";
import { CircleStopIcon, Volume2Icon } from "lucide-react";

type Props = { text: string };

export const SpeakButton = ({ text }: Props) => {
  const [playing, setPlaying] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    setPlaying(true);

    const synth = window.speechSynthesis;

    if (utterance) {
      utterance.onend = () => {
        setPlaying(false);
      };

      synth.speak(utterance);
    }
  };

  const handleStop = () => {
    setPlaying(false);

    const synth = window.speechSynthesis;

    synth.cancel();
  };

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
