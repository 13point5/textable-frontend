import { SpeakButton } from "@/components/chatroom/components/message-item/speak-button";
import { TextRenderer } from "@/components/chatroom/components/message-item/text-renderer";
import { TranslatedMessage } from "@/components/chatroom/components/message-item/translated-message";
import { useTranslation } from "@/hooks/useTranslation";
import {
  LanguagesIcon,
  Loader2Icon,
  MessageSquareWarningIcon,
} from "lucide-react";
import { useState } from "react";

type Props = {
  message: string;
  sent: boolean;
  feedback: {
    grade: string;
    content: string;
  } | null;
};

export const MessageItem = ({ message, sent, feedback }: Props) => {
  const profileColor = sent ? "bg-green-300" : "bg-blue-300";

  const [showTranslation, setShowTranslation] = useState(false);
  const { translation, translate } = useTranslation();

  const [showFeedback, setShowFeedback] = useState(false);

  const handleFeedbackButtonClick = () => {
    setShowFeedback((prev) => !prev);
  };

  const handleTranslationButtonClick = async () => {
    await translate();

    setShowTranslation((prev) => !prev);
  };

  return (
    <div className={`flex gap-2 ${!sent && "justify-end"}`}>
      {sent && <div className={`w-8 h-8 rounded-full ${profileColor}`} />}

      <div className="flex flex-col gap-1 items-end max-w[50%]">
        <div className="w-full">
          {/* Message */}
          <div
            className={`p-2 bg-slate-100 rounded-t-lg ${
              !showTranslation && "rounded-b-lg"
            } flex flex-col gap-2`}
          >
            <TextRenderer text={message} />

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

              {!sent && feedback && (
                <div
                  onClick={handleFeedbackButtonClick}
                  className="cursor-pointer flex gap-1 items-center text-xs font-thin text-black p-[0.5]"
                >
                  <MessageSquareWarningIcon className="w-3 h-3" /> Feedback
                </div>
              )}
            </div>
          </div>

          {/* Translated msg */}
          {showTranslation && (
            <TranslatedMessage
              data={translation}
              className={showFeedback ? "rounded-none" : ""}
            />
          )}

          {/* Feedback */}
          {/* {showFeedback && (
            <div className="p-2 bg-slate-100 flex flex-col gap-2">
              <span className="text-sm">{feedback?.content}</span>
            </div>
          )} */}
        </div>

        <span className="flex gap-1 text-xs">✅ Good</span>
      </div>
    </div>
  );
};
