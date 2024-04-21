import RedBot from "@/assets/red-avatar.svg";
import GreenBot from "@/assets/green-avatar.svg";
import PurpleBot from "@/assets/purple-bot.svg";

const ChatTab = () => {
  return (
    <div className="flex-1 flex flex-col gap-4 bg-bg1">
      <div className="flex items-center justify-center p-2 py-4 bg-white border-b-2">
        <h1 className="text-3xl font-h1 mt-2">Messages</h1>
      </div>

      <div className="flex flex-col gap-2">
        <MessagePreviewItem
          avatar={RedBot}
          name="Red Bot"
          message="Et vous vous êtes rencontrés comment?"
          time="10:02 AM"
        />

        <MessagePreviewItem
          avatar={GreenBot}
          name="Green Bot"
          message="Et vous vous êtes rencontrés comment?"
          time="5:43 PM"
        />

        <MessagePreviewItem
          avatar={PurpleBot}
          name="Purple Bot"
          message="Et vous vous êtes rencontrés comment?"
          time="9:29 PM"
        />
      </div>
    </div>
  );
};

export default ChatTab;

type MessagePreviewItemProps = {
  avatar: string;
  name: string;
  message: string;
  time: string;
};

const MessagePreviewItem = ({
  avatar,
  name,
  message,
  time,
}: MessagePreviewItemProps) => {
  return (
    <div className="w-full flex gap-2 cursor-pointer hover:bg-slate-100">
      <img src={avatar} alt="Red Bot" className="w-12 h-12 pl-2" />

      <div className="flex-1 flex flex-col gap-2 border-b py-2 px-2">
        <div className="w-full flex gap-2 items-center justify-between">
          <span className="text-md font-h2">{name}</span>

          <span className="text-sm text-muted-foreground">{time}</span>
        </div>

        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </div>
  );
};
