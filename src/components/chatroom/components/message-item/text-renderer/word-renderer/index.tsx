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
import { useContext } from "react";

type WordProps = {
  word: string;
  position: WordPosition;
};

export const WordRenderer = ({ word, position }: WordProps) => {
  // Extract the word without punctuation for the popup.
  const wordWithoutPunctuation = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

  const { chosenWord, setChosenWord } = useContext(TextRendererContext);
  const isChosenWord =
    chosenWord &&
    chosenWord.lineIndex === position.lineIndex &&
    chosenWord.wordIndex === position.wordIndex;

  const handleWordClick = () => {
    if (isChosenWord) {
      setChosenWord(null);
    } else {
      setChosenWord(position);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <span
          onClick={handleWordClick}
          className={`cursor-pointer ${isChosenWord && "text-orange-500"}`}
        >
          {word}
        </span>
      </PopoverTrigger>

      <PopoverContent className="bg-orange-200 border-none p-2 rounded-sm text-xs w-max flex flex-col items-center gap-2 mx-2">
        <WordRendererPopup word={wordWithoutPunctuation} />
      </PopoverContent>
    </Popover>
  );
};
