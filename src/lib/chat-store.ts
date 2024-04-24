import {
  ComposerData,
  Message,
  MessageFeedback,
  MessageRole,
  RoomPreview,
} from "@/lib/types";
import { create } from "zustand";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { axiosInstance } from "@/api/axios";

export type RoomId = string;

type Store = {
  selectedRoomId: RoomId | null;
  setSelectedRoomId(id: RoomId | null): void;

  roomIds: RoomId[];
  messagesByRoomId: Record<RoomId, Message[]>;
  composerDataByRoomId: Record<RoomId, ComposerData>;

  getComposerDataByRoomId(roomId: RoomId): ComposerData;
  setComposerDataByRoomId(roomId: RoomId, data: Partial<ComposerData>): void;

  getRoomPreviews(): RoomPreview[];

  chat(roomId: RoomId, text: string, images: string[]): void;

  addMessage(roomId: RoomId, message: Message): void;
  getMessagesByRoomId(roomId: RoomId): Message[];

  addBotResponseAndFeedback(
    roomId: RoomId,
    response: string,
    feedback: MessageFeedback
  ): void;
};

const useChatStore = create<Store>()((set, get) => ({
  selectedRoomId: null,
  setSelectedRoomId: (id) => {
    set(
      produce((state: Store) => {
        state.selectedRoomId = id;
      })
    );
  },

  roomIds: ["redbot", "greenbot", "purplebot"],
  messagesByRoomId: {
    redbot: [
      {
        id: nanoid(),
        role: MessageRole.AI,
        content: {
          text: "Si tu devais garder que trois aliments, tu garderais lesquels?",
          images: [],
        },
        feedback: null,
      },
    ],
    greenbot: [
      {
        id: nanoid(),
        role: MessageRole.AI,
        content: { text: "Et toi, tu vas souvent au musée?", images: [] },
        feedback: null,
      },
    ],
    purplebot: [
      {
        id: nanoid(),
        role: MessageRole.AI,
        content: {
          text: "Et toi, tu as un petit déjeuner préféré?",
          images: [],
        },
        feedback: null,
      },
    ],
  },
  composerDataByRoomId: {
    redbot: {
      loading: false,
      inputValue: "",
    },
    greenbot: {
      loading: false,
      inputValue: "",
    },
    purplebot: {
      loading: false,
      inputValue: "",
    },
  },

  getComposerDataByRoomId: (roomId) =>
    get().composerDataByRoomId[roomId] || {
      loading: false,
      inputValue: "",
    },
  setComposerDataByRoomId: (roomId, data) => {
    set(
      produce((state) => {
        state.composerDataByRoomId[roomId] = {
          ...state.composerDataByRoomId[roomId],
          ...data,
        };
      })
    );
  },

  getRoomPreviews: () => {
    const state = get();

    return state.roomIds.map((roomId) => {
      const messages = state.messagesByRoomId[roomId];
      const lastMessageId = messages[messages.length - 1].id;

      return {
        id: roomId,
        lastMessageId,
      };
    });
  },

  getMessagesByRoomId: (roomId) => get().messagesByRoomId[roomId] || [],

  chat: async (roomId, text, images) => {
    const state = get();

    state.setComposerDataByRoomId(roomId, { loading: true });

    const newMessage: Message = {
      id: nanoid(),
      content: {
        text,
        images,
      },
      role: MessageRole.HUMAN,
      feedback: null,
    };

    const messages = state.getMessagesByRoomId(roomId);

    state.addMessage(roomId, newMessage);

    try {
      const res = await axiosInstance.post("/chat", {
        roomId,
        messages: [...messages, newMessage],
      });

      state.addBotResponseAndFeedback(
        roomId,
        res.data.response,
        res.data.feedback
      );
    } catch (error) {
      console.error(error);
    } finally {
      state.setComposerDataByRoomId(roomId, { loading: false });
    }
  },

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
          content: {
            text: response,
            images: [],
          },
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

export default useChatStore;
