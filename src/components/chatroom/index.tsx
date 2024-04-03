import { Header } from "@/components/chatroom/components/header";
import { MessageComposer } from "@/components/chatroom/components/message-composer";
import { MessageList } from "@/components/chatroom/components/message-list";

export const Chatroom = () => {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <Header />
      <MessageList />
      <MessageComposer />
    </div>
  );
};
