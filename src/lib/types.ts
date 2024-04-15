export enum MessageRole {
  HUMAN = "human",
  AI = "ai",
}

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  feedback: MessageFeedback | null;
};

export type MessageFeedback = {
  grade: string;
  content: string;
};
