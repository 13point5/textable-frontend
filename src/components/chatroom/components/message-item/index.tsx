import { ActionBar } from "@/components/chatroom/components/message-item/action-bar";
import { FeedbackGrade } from "@/components/chatroom/components/message-item/feedback-preview";
import { TextRenderer } from "@/components/chatroom/components/message-item/text-renderer";
import { TranslatedMessage } from "@/components/chatroom/components/message-item/translated-message";
import { useTranslation } from "@/hooks/useTranslation";
import { MessageFeedback, MessageRole } from "@/lib/types";
import { useState } from "react";

type Props = {
  message: string;
  role: MessageRole;
  feedback: MessageFeedback | null;
};

export const MessageItem = ({ message, role, feedback }: Props) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const handleFeedbackButtonClick = () => {
    setShowFeedback((prev) => !prev);
  };

  const [showUserMsgTranslation, setShowUserMsgTranslation] = useState(false);
  const { translation: userMsgTranslation, translate: translateUserMsg } =
    useTranslation();

  const handleUserMsgTranslationButtonClick = async () => {
    await translateUserMsg(message);

    setShowUserMsgTranslation((prev) => !prev);
  };

  const [showFeedbackTranslation, setShowFeedbackTranslation] = useState(false);
  const { translation: feedbackTranslation, translate: translateFeedback } =
    useTranslation();

  const handleFeedbackTranslationButtonClick = async () => {
    if (!feedback) return;

    await translateFeedback(feedback.content);

    setShowFeedbackTranslation((prev) => !prev);
  };

  return (
    <div
      className={`flex gap-2 ${role === MessageRole.HUMAN && "justify-end"}`}
    >
      {role === MessageRole.AI && (
        <div className={`w-8 h-8 rounded-full bg-green-300`} />
      )}

      <div className="flex flex-col gap-1 items-end max-w[50%]">
        <div className="w-full">
          {/* Message */}
          <div
            className={`p-2 bg-slate-100 rounded-t-lg ${
              !showUserMsgTranslation && !showFeedback && "rounded-b-lg"
            } flex flex-col gap-2`}
          >
            <TextRenderer
              text={message}
              className={showFeedback ? "text-red-400" : ""}
            />

            <ActionBar
              message={message}
              translation={{
                loading: userMsgTranslation.loading,
                onClick: handleUserMsgTranslationButtonClick,
              }}
              feedback={{
                show: role === MessageRole.HUMAN && Boolean(feedback),
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
                <TextRenderer
                  text={feedback.content}
                  className="text-green-500"
                />

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

        {role === MessageRole.HUMAN && feedback && (
          <FeedbackGrade feedback={feedback} />
          // <span className="flex gap-1 text-xs">✅ Good</span>
        )}
      </div>
    </div>
  );
};
