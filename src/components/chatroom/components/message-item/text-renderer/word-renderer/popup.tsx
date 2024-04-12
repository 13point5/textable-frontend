import SpeakButton from "@/components/chatroom/components/message-item/text-renderer/word-renderer/speaker-button";
import { TranslatedWord } from "@/components/chatroom/components/message-item/text-renderer/word-renderer/translated-text";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

type Props = {
  word: string;
};

export const WordRendererPopup = ({ word }: Props) => {
  return (
    <div className="absolute top-full left-0 mt-1 z-10 bg-orange-200 p-2 rounded-sm shadow-sm text-xs flex flex-col items-center gap-2 w-max">
      <span className="">{word}</span>

      <Separator className="bg-zinc-400" />

      <TranslatedWord word={word} />

      <Separator className="bg-zinc-400" />

      <div className="flex gap-2">
        <SpeakButton text={word} />

        <PlusIcon className="cursor-pointer w-3 h-3" />
      </div>
    </div>
  );
};
