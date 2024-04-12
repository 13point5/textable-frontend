import {
  TextRendererContext,
  WordPosition,
} from "@/components/chatroom/components/message-item/text-renderer/context";
import { WordRendererPopup } from "@/components/chatroom/components/message-item/text-renderer/word-renderer/popup";
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
    <span className="relative">
      <span
        onClick={handleWordClick}
        className={`cursor-pointer ${isChosenWord && "text-blue-500"}`}
      >
        {word}
      </span>

      {isChosenWord && <WordRendererPopup word={wordWithoutPunctuation} />}
    </span>
  );
};
