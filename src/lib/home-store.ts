import { create } from "zustand";
import { produce } from "immer";

type Store = {
  sendPostDialog: {
    isOpen: boolean;
    data: null | {
      content: string;
    };
  };
  openSendPostDialog(content: string): void;
  onSendPostDialogOpenChange(isOpen: boolean): void;
};

const useHomeStore = create<Store>()((set) => ({
  sendPostDialog: {
    isOpen: false,
    data: null,
  },
  openSendPostDialog: (content: string) => {
    set(
      produce((state: Store) => {
        state.sendPostDialog.isOpen = true;
        state.sendPostDialog.data = {
          content,
        };
      })
    );
  },
  onSendPostDialogOpenChange: (isOpen: boolean) => {
    set(
      produce((state: Store) => {
        state.sendPostDialog.isOpen = isOpen;

        if (!isOpen) {
          state.sendPostDialog.data = null;
        }
      })
    );
  },
}));

export default useHomeStore;
