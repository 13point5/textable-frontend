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

  const [showFeedback, setShowFeedback] = useState(false);

  const [showUserMsgTranslation, setShowUserMsgTranslation] = useState(false);
  const { translation: userMsgTranslation, translate: translateUserMsg } =
    useTranslation();

  const handleFeedbackButtonClick = () => {
    setShowFeedback((prev) => !prev);
  };

  const handleUserMsgTranslationButtonClick = async () => {
    await translateUserMsg();

    setShowUserMsgTranslation((prev) => !prev);
  };

  const [showFeedbackTranslation, setShowFeedbackTranslation] = useState(false);
  const { translation: feedbackTranslation, translate: translateFeedback } =
    useTranslation();

  const handleFeedbackTranslationButtonClick = async () => {
    await translateFeedback();

    setShowFeedbackTranslation((prev) => !prev);
  };

  return (
    <div className={`flex gap-2 ${!sent && "justify-end"}`}>
      {sent && <div className={`w-8 h-8 rounded-full ${profileColor}`} />}

      <div className="flex flex-col gap-1 items-end max-w[50%]">
        <div className="w-full">
          {/* Message */}
          <div
            className={`p-2 bg-slate-100 rounded-t-lg ${
              !showUserMsgTranslation && "rounded-b-lg"
            } flex flex-col gap-2`}
          >
            <TextRenderer text={message} />

            <ActionBar
              message={message}
              translation={{
                loading: userMsgTranslation.loading,
                onClick: handleUserMsgTranslationButtonClick,
              }}
              feedback={{
                show: !sent && Boolean(feedback),
                onClick: handleFeedbackButtonClick,
              }}
            />
          </div>

          {showUserMsgTranslation && (
            <TranslatedMessage
              data={userMsgTranslation}
              className={showFeedback ? "rounded-none" : ""}
            />
          )}

          {/* Feedback */}
          {showFeedback && feedback && (
            <>
              <div
                className={`p-2 bg-slate-100 flex flex-col gap-2 ${
                  !showFeedbackTranslation && "rounded-b-lg"
                }`}
              >
                <TextRenderer text={feedback.content} />

                <ActionBar
                  message={feedback.content}
                  translation={{
                    loading: feedbackTranslation.loading,
                    onClick: handleFeedbackTranslationButtonClick,
                  }}
                />
              </div>

              {showFeedbackTranslation && (
                <TranslatedMessage
                  data={feedbackTranslation}
                  className="rounded-b-lg"
                />
              )}
            </>
          )}
        </div>

        <span className="flex gap-1 text-xs">✅ Good</span>
      </div>
    </div>
  );
};
