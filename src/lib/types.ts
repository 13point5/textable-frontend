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
