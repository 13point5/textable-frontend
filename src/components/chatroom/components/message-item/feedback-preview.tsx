import { MessageFeedback } from "@/lib/types";

type Props = {
  feedback: MessageFeedback;
};

const getFeedbackEmoji = (grade: string) => {
  if (grade === "good") return "👍";
  if (grade === "great") return "🔥";

  return "";
};

export const FeedbackGrade = ({ feedback }: Props) => {
  if (feedback.grade === "none") return null;

  return (
    <span className="flex gap-1 text-xs">
      {getFeedbackEmoji(feedback.grade)} {feedback.grade}
    </span>
  );
};
