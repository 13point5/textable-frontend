import {
  ChosenWord,
  TextRendererContext,
} from "@/components/chatroom/components/message-item/text-renderer/context";
import { WordRenderer } from "@/components/chatroom/components/message-item/text-renderer/word-renderer";
import { RoomId } from "@/lib/chat-store";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

type TextRendererProps = {
  roomId: RoomId;
  text: string;
  className?: string;
};

export const TextRenderer = ({
  roomId,
  text,
  className = "",
}: TextRendererProps) => {
  // Split the text by newlines, then process those lines to account for words, spaces, and punctuation
  const lines = text.split("\n");

  const [chosenWord, setChosenWord] = useState<ChosenWord>(null);

  return (
    <div className={cn(`text-sm`, className)}>
      <TextRendererContext.Provider value={{ chosenWord, setChosenWord }}>
        {lines.map((line, lineIndex) => {
          // Use \p{L} to match any kind of letter and '+' to include apostrophes and sequences of word characters
          const wordsAndPunctuations =
            line.match(/[\p{L}']+[.,!?;]?|\s+/gu) || [];

          return (
            <React.Fragment key={lineIndex}>
              {wordsAndPunctuations.map((wordOrPunctuation, index) =>
                /\w/.test(wordOrPunctuation) ? (
                  <WordRenderer
                    roomId={roomId}
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
