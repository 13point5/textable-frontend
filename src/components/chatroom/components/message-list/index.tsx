import { MessageItem } from "@/components/chatroom/components/message-item";

export const MessageList = () => {
  return (
    <div className="flex-1 flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-4 overflow-auto">
        {Array.from({ length: 20 }).map((_, index) => (
          <MessageItem
            message={`Message ${index} blalalalalala`}
            sent={index % 2 === 0}
            feedback={
              index % 3 === 0
                ? { grade: "Good", content: `Message ${index} is good` }
                : null
            }
          />
        ))}
      </div>
    </div>
  );
};
