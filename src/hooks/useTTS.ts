import axios from "axios";
import { useState, useCallback } from "react";

const defaultVoiceId = "29vD33N1CtxCmqQRPOHJ";

export const useTTS = (text: string, voiceId?: string) => {
  const [playing, setPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<HTMLAudioElement | null>(null);

  const playAudio = (audioSrc: HTMLAudioElement | null) => {
    if (audioSrc) {
      audioSrc.play();
      audioSrc.onended = () => {
        setPlaying(false);
      };
    }
  };

  const handleStop = useCallback(() => {
    if (audioSrc) {
      audioSrc.pause();
      audioSrc.currentTime = 0;
    }
    setPlaying(false);
  }, [audioSrc]);

  const handlePlay = async () => {
    if (!text) return; // No text to play
    setPlaying(true);

    if (audioSrc) {
      playAudio(audioSrc);
    } else {
      try {
        const response = await axios.post(
          `https://api.elevenlabs.io/v1/text-to-speech/${
            voiceId || defaultVoiceId
          }`,
          {
            text,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "audio/mpeg",
              "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
            },
            responseType: "blob",
          }
        );

        const newAudio = new Audio(URL.createObjectURL(response.data));
        setAudioSrc(newAudio);
        playAudio(newAudio);
      } catch (error) {
        console.error("Error in fetching audio:", error);
        alert("Error in fetching audio: " + (error as Error).message);
        setPlaying(false);
      } finally {
        setPlaying(false);
      }
    }
  };

  return { playing, handlePlay, handleStop };
};
