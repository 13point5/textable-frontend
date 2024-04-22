import useHomeStore from "@/lib/home-store";
import { CirclePlusIcon, HeartIcon, SendIcon } from "lucide-react";

type Props = {
  avatar: string;
  username: string;
  content: string;
  time: string;
  likes: number;
  img: string;
};

export const MomentCard = ({
  avatar,
  username,
  content,
  time,
  likes,
  img,
}: Props) => {
  const openSendPostDialog = useHomeStore((state) => state.openSendPostDialog);

  const handleOpenSendPostDialog = () => {
    openSendPostDialog(img);
  };

  return (
    <div className="flex gap-4">
      <img src={avatar} alt="Bot Avatar" className="w-10 h-10 rounded-full" />

      <div className="flex flex-col gap-1">
        <span className="text-lg font-bold font-h1">{username}</span>

        <span className="text-sm">{content}</span>

        <img src={img} alt="Meme" className="w-full h-48 object-cover" />

        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{time}</span>

          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <HeartIcon className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </div>

            <CirclePlusIcon className="w-4 h-4" />

            <SendIcon onClick={handleOpenSendPostDialog} className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
