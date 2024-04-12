import { useState, useEffect } from "react";

export const useTextToSpeech = (text: string) => {
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

  return { playing, handlePlay, handleStop };
};
