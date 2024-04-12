import { ActionBar } from "@/components/chatroom/components/message-item/action-bar";
import { TextRenderer } from "@/components/chatroom/components/message-item/text-renderer";
import { TranslatedMessage } from "@/components/chatroom/components/message-item/translated-message";
import { useTranslation } from "@/hooks/useTranslation";
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

            <ActionBar
              message={message}
              translation={{
                loading: translation.loading,
                onClick: handleTranslationButtonClick,
              }}
              feedback={{
                show: !sent && Boolean(feedback),
                onClick: handleFeedbackButtonClick,
              }}
            />
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
