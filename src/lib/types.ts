import { RoomId } from "@/lib/chat-store";

export enum MessageRole {
  HUMAN = "user",
  AI = "assistant",
}

export type Message = {
  id: string;
  role: MessageRole;
  content: {
    text: string;
    images: string[];
  };
  feedback: MessageFeedback | null;
};

export type MessageFeedback = {
  grade: string;
  content: string;
  perfect: boolean;
};

export type ComposerData = {
  loading: boolean;
  inputValue: string;
};

export type RoomPreview = {
  id: RoomId;
  lastMessageId: string;
};
