import {
  ChosenWord,
  TextRendererContext,
} from "@/components/chatroom/components/message-item/text-renderer/context";
import { WordRenderer } from "@/components/chatroom/components/message-item/text-renderer/word-renderer";
import React, { useState } from "react";

type TextRendererProps = {
  text: string;
};

export const TextRenderer = ({ text }: TextRendererProps) => {
  // Split the text by newlines, then process those lines to account for words, spaces, and punctuation
  const lines = text.split("\n");

  const [chosenWord, setChosenWord] = useState<ChosenWord>(null);

  return (
    <div className="text-sm">
      <TextRendererContext.Provider value={{ chosenWord, setChosenWord }}>
        {lines.map((line, lineIndex) => {
          // This pattern splits the line into words, spaces, and punctuation marks, treating spaces as significant.
          const wordsAndPunctuations = line.match(/[\w']+|[.,!?;]|\s+/g) || [];
          return (
            <React.Fragment key={lineIndex}>
              {wordsAndPunctuations.map((wordOrPunctuation, index) =>
                /\w/.test(wordOrPunctuation) ? (
                  <WordRenderer
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
