import { Message, MessageFeedback, MessageRole } from "@/lib/types";
import { create } from "zustand";
import { produce } from "immer";

export type RoomId = string;

type Store = {
  roomIds: RoomId[];
  messagesByRoomId: Record<RoomId, Message[]>;

  addMessage(roomId: RoomId, message: Message): void;
  getMessagesByRoomId(roomId: RoomId): Message[];

  addBotResponseAndFeedback(
    roomId: RoomId,
    response: string,
    feedback: MessageFeedback
  ): void;
};

const useStore = create<Store>()((set, get) => ({
  roomIds: [],
  messagesByRoomId: {},

  getMessagesByRoomId: (roomId) => get().messagesByRoomId[roomId] || [],

  addMessage: (roomId, message) => {
    set(
      produce((state) => {
        if (!state.roomIds.includes(roomId)) {
          state.roomIds.push(roomId);
        }

        if (!state.messagesByRoomId[roomId]) {
          state.messagesByRoomId[roomId] = [];
        }

        state.messagesByRoomId[roomId].push(message);
      })
    );
  },

  addBotResponseAndFeedback: (roomId, response, feedback) => {
    set(
      produce((state: Store): void => {
        if (!state.roomIds.includes(roomId)) {
          state.roomIds.push(roomId);
        }

        if (!state.messagesByRoomId[roomId]) {
          state.messagesByRoomId[roomId] = [];
        }

        state.messagesByRoomId[roomId].push({
          id: String(Date.now()),
          role: MessageRole.AI,
          content: response,
          feedback: null,
        });

        // Find last human message and add feedback to it
        const roomMessages = state.messagesByRoomId[roomId];
        let lastHumanMessageIndex = -1;
        for (let i = roomMessages.length - 1; i >= 0; i--) {
          if (roomMessages[i].role === MessageRole.HUMAN) {
            lastHumanMessageIndex = i;
            break;
          }
        }

        if (lastHumanMessageIndex !== -1) {
          const lastHumanMessage =
            state.messagesByRoomId[roomId][lastHumanMessageIndex];

          state.messagesByRoomId[roomId][lastHumanMessageIndex] = {
            ...lastHumanMessage,
            feedback,
          };
        }
      })
    );
  },
}));

export default useStore;
