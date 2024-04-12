import { createContext } from "react";

export type WordPosition = {
  lineIndex: number;
  wordIndex: number;
};

export type ChosenWord = WordPosition | null;

type TextRendererContextValue = {
  chosenWord: ChosenWord;
  setChosenWord: (data: ChosenWord) => void;
};

export const TextRendererContext = createContext<TextRendererContextValue>({
  chosenWord: null,
  setChosenWord: () => {},
});
