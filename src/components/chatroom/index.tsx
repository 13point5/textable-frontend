import { Header } from "@/components/chatroom/components/header";
import { MessageComposer } from "@/components/chatroom/components/message-composer";
import { MessageList } from "@/components/chatroom/components/message-list";

export const Chatroom = () => {
  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="fixed top-0 w-full z-10">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto pt-16 pb-20">
        <MessageList />
      </div>

      <div className="fixed bottom-0 w-full z-10">
        <MessageComposer />
      </div>
    </div>
  );
};
