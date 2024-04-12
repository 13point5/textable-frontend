import SpeakButton from "@/components/chatroom/components/message-item/text-renderer/word-renderer/speaker-button";
import { TranslatedWord } from "@/components/chatroom/components/message-item/text-renderer/word-renderer/translated-text";
import { PlusIcon } from "lucide-react";

type Props = {
  word: string;
};

export const WordRendererPopup = ({ word }: Props) => {
  return (
    <div
      className={`absolute top-full left-0 mt-1 z-1 bg-blue-200 p-2 rounded-sm shadow-sm text-sm flex flex-col gap-2 w-max}`}
      style={{
        width: "max-content",
      }}
    >
      <SpeakButton text={word} />

      <TranslatedWord word={word} />

      <div className="cursor-pointer flex items-center gap-1">
        <PlusIcon className="w-3 h-3" />
        <span className="text-xs font-thin">Add to workbook</span>
      </div>
    </div>
  );
};
