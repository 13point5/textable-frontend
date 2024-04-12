import { create } from "zustand";

type Store = {
  translations: Record<string, string>;

  setTranslation: (word: string, translation: string) => void;
  getTranslation: (word: string) => string | null;
};

const useStore = create<Store>()((set, get) => ({
  translations: {},

  setTranslation: (word, translation) => {
    set((state) => ({
      translations: {
        ...state.translations,
        [word]: translation,
      },
    }));
  },

  getTranslation: (word) => {
    return get().translations[word] || null;
  },
}));

export default useStore;
