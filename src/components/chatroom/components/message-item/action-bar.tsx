import { SpeakButton } from "@/components/chatroom/components/message-item/speak-button";
import {
  LanguagesIcon,
  Loader2Icon,
  MessageSquareWarningIcon,
} from "lucide-react";

type Props = {
  message: string;
  translation: {
    loading: boolean;
    onClick: () => void;
  };
  feedback: {
    show: boolean;
    onClick: () => void;
  };
};

export const ActionBar = ({ message, translation, feedback }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <SpeakButton text={message} />

      <div
        aria-disabled={translation.loading}
        onClick={translation.onClick}
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

      {feedback.show && (
        <div
          onClick={feedback.onClick}
          className="cursor-pointer flex gap-1 items-center text-xs font-thin text-black p-[0.5]"
        >
          <MessageSquareWarningIcon className="w-3 h-3" /> Feedback
        </div>
      )}
    </div>
  );
};
