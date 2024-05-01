import {
  TextRendererContext,
  WordPosition,
} from "@/components/chatroom/components/message-item/text-renderer/context";
import { WordRendererPopup } from "@/components/chatroom/components/message-item/text-renderer/word-renderer/popup";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoomId } from "@/lib/chat-store";
import { useContext } from "react";

type WordProps = {
  roomId: RoomId;
  word: string;
  position: WordPosition;
};

export const WordRenderer = ({ roomId, word, position }: WordProps) => {
  // Extract the word without punctuation for the popup.
  const wordWithoutPunctuation = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

  const { chosenWord, setChosenWord } = useContext(TextRendererContext);
  const isChosenWord =
    chosenWord &&
    chosenWord.lineIndex === position.lineIndex &&
    chosenWord.wordIndex === position.wordIndex;

  const handleWordClick = (open: boolean) => {
    if (open) {
      setChosenWord(position);
    } else {
      setChosenWord(null);
    }
  };

  return (
    <Popover onOpenChange={handleWordClick}>
      <PopoverTrigger>
        <span className={`cursor-pointer ${isChosenWord && "font-bold"}`}>
          {word}
        </span>
      </PopoverTrigger>

      {/* <PopoverContent className="bg-orange-200 border-none p-2 rounded-sm text-xs w-max flex flex-col items-center gap-2 mx-2"> */}
      <PopoverContent className="border-2 border-black bg-white p-2 rounded-sm text-xs w-max flex flex-col items-center gap-2 mx-2">
        <WordRendererPopup word={wordWithoutPunctuation} roomId={roomId} />
      </PopoverContent>
    </Popover>
  );
};
