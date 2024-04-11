import { axiosInstance } from "@/api/axios";
import { APIResponse } from "@/api/types";
import {
  CircleStopIcon,
  LanguagesIcon,
  Loader2Icon,
  Volume2Icon,
} from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  message: string;
  sent: boolean;
};

export const MessageItem = ({ message, sent }: Props) => {
  const formattedMessage = message.replace("\\n", "<br />");

  const profileColor = sent ? "bg-green-300" : "bg-blue-300";

  const [showTranslation, setShowTranslation] = useState(false);
  const [translation, setTranslation] = useState<APIResponse<string>>({
    loading: false,
    error: null,
    data: null,
  });

  const handleTranslationButtonClick = async () => {
    // 1. Get translation
    if (!translation.data || translation.loading) {
      try {
        setTranslation({
          loading: true,
          error: null,
          data: null,
        });

        const res = await axiosInstance.post("/translate", {
          text: "La vie est belle",
        });

        setTranslation({
          loading: false,
          error: null,
          data: res.data.translatedText,
        });
      } catch (error) {
        console.error(error);

        setTranslation({
          loading: false,
          error: "Something went wrong",
          data: null,
        });
      }
    }

    // 2. Toggle showTranslation
    setShowTranslation((prev) => !prev);
  };

  return (
    <div className={`flex gap-2 ${!sent && "justify-end"}`}>
      {sent && <div className={`w-8 h-8 rounded-full ${profileColor}`} />}

      <div className="max-w-[50%]">
        {/* Message */}
        <div
          className={`p-2 bg-slate-100 rounded-t-lg ${
            !showTranslation && "rounded-b-lg"
          } flex flex-col gap-2`}
        >
          <p
            className="text-sm"
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              overflow: "hidden",
              maxWidth: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: formattedMessage }}
          />

          <div className="flex gap-4 items-center">
            <SpeakButton text={message} />

            <div
              aria-disabled={translation.loading}
              onClick={handleTranslationButtonClick}
              className="cursor-pointer flex gap-1 items-center text-xs font-thin text-black p-[0.5]"
            >
              {translation.loading ? (
                <>
                  <Loader2Icon className="animate-spin w-3 h-3" /> Translating
                </>
              ) : (
                <>
                  <LanguagesIcon className="w-3 h-3" /> Translate
                </>
              )}
            </div>
          </div>
        </div>

        {/* Translated msg */}
        {showTranslation && <TranslatedMessage data={translation} />}
      </div>
    </div>
  );
};

const SpeakButton = ({ text }: { text: string }) => {
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

const TranslatedMessage = ({ data }: { data: APIResponse<string> }) => {
  return (
    <>
      {data.loading && <Loader2Icon className="animate-spin" />}

      {data.data && (
        <div className="p-2 bg-yellow-100 rounded-b-lg">
          <p
            className="text-sm"
            style={{
              overflowWrap: "break-word",
              wordBreak: "break-word",
              overflow: "hidden",
              maxWidth: "100%",
            }}
            dangerouslySetInnerHTML={{ __html: data.data }}
          />
        </div>
      )}

      {data.error && (
        <div className="p-2 bg-red-100 text-red-500 rounded-b-lg">
          <p className="text-sm">{data.error}</p>
        </div>
      )}
    </>
  );
};
