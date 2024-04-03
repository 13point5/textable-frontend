import { Header } from "@/components/chatroom/components/header";
import { MessageComposer } from "@/components/chatroom/components/message-composer";
import { MessageList } from "@/components/chatroom/components/message-list";

export const Chatroom = () => {
  return (
    // <div className="relative w-full h-screen overflow-hidden flex flex-col">
    //   <Header />
    //   <MessageList />
    //   <MessageComposer />
    // </div>

    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 fixed top-0 w-full z-10">
        Chat Header
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto pt-16 pb-20">
        {/* Example messages */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="m-4 p-2 bg-gray-200 rounded-lg">
            Message {index}
          </div>
        ))}
        {/* Messages will go here */}
      </div>

      {/* Message Composer */}
      <div className="p-4 fixed bottom-0 w-full bg-white border-t border-gray-300 z-10">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};
