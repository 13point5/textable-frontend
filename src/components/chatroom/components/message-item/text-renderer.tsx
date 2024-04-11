import {
  ChosenWord,
  TextRendererContext,
  WordPosition,
} from "@/components/chatroom/components/message-item/text-renderer-context";
import React, { useContext, useState } from "react";

type TextRendererProps = {
  text: string;
};

export const TextRenderer = ({ text }: TextRendererProps) => {
  // Split the text by newlines, then process those lines to account for words, spaces, and punctuation
  const lines = text.split("\n");

  const [chosenWord, setChosenWord] = useState<ChosenWord>(null);

  return (
    <div>
      <TextRendererContext.Provider value={{ chosenWord, setChosenWord }}>
        {lines.map((line, lineIndex) => {
          // This pattern splits the line into words, spaces, and punctuation marks, treating spaces as significant.
          const wordsAndPunctuations = line.match(/[\w']+|[.,!?;]|\s+/g) || [];
          return (
            <React.Fragment key={lineIndex}>
              {wordsAndPunctuations.map((wordOrPunctuation, index) =>
                /\w/.test(wordOrPunctuation) ? (
                  <Word
                    key={index}
                    word={wordOrPunctuation}
                    position={{
                      lineIndex,
                      wordIndex: index,
                    }}
                  />
                ) : (
                  // Render spaces and punctuation directly
                  <span key={index}>{wordOrPunctuation}</span>
                )
              )}
              {lineIndex < lines.length - 1 && <br />}
            </React.Fragment>
          );
        })}
      </TextRendererContext.Provider>
    </div>
  );
};

type WordProps = {
  word: string;
  position: WordPosition;
};

const Word = ({ word, position }: WordProps) => {
  // Extract the word without punctuation for the popup.
  const wordWithoutPunctuation = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");

  const { chosenWord, setChosenWord } = useContext(TextRendererContext);
  const showPopup =
    chosenWord &&
    chosenWord.lineIndex === position.lineIndex &&
    chosenWord.wordIndex === position.wordIndex;

  const handleWordClick = () => {
    if (showPopup) {
      setChosenWord(null);
    } else {
      setChosenWord(position);
    }
  };

  return (
    <span className="relative">
      <span
        onClick={handleWordClick}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        {word}
      </span>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            border: "1px solid black",
            padding: "10px",
            background: "white",
            top: "100%",
            left: 0,
          }}
        >
          Highlighted: {wordWithoutPunctuation}
        </div>
      )}
    </span>
  );
};
