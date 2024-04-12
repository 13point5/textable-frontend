import SpeakButton from "@/components/chatroom/components/message-item/text-renderer/word-renderer/speaker-button";
import { TranslatedWord } from "@/components/chatroom/components/message-item/text-renderer/word-renderer/translated-text";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

type Props = {
  word: string;
};

export const WordRendererPopup = ({ word }: Props) => {
  return (
    <>
      <span className="">{word}</span>

      <Separator className="bg-zinc-400" />

      <TranslatedWord word={word} />

      <Separator className="bg-zinc-400" />

      <div className="flex gap-2">
        <SpeakButton text={word} />

        <PlusIcon className="cursor-pointer w-3 h-3" />
      </div>
    </>
  );
};
