import { MessageItem } from "@/components/chatroom/components/message-item";

export const MessageList = () => {
  return (
    <div className="flex-1 flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-2 overflow-auto">
        <MessageItem message="Hello! \n lala" sent={true} />
        <MessageItem message="Hi!" sent={false} />
        <MessageItem
          message="Hello! \n lala lorem slfjnvlsfnvsfnvfsljkvnsfljnvsflnvskfnvlfsjnvlfjsvnbsfljbvnlfsbnvklsfbnvkljsfbnvkljfs"
          sent={true}
        />

        {/* <div className="flex gap-2 items-center">
          <img
            src="https://avatars.dicebear.com/api/avataaars/1.svg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="p-2 bg-slate-100 rounded-lg">
            <p className="text-sm">Hello!</p>
          </div>
        </div>

        <div className="flex gap-2 items-center justify-end">
          <div className="p-2 bg-slate-100 rounded-lg">
            <p className="text-sm">Hi!</p>
          </div>
          <img
            src="https://avatars.dicebear.com/api/avataaars/2.svg"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
        </div> */}
      </div>
    </div>
  );
};
