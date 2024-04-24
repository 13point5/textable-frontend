import { FeedCard } from "@/components/feed-card";
import RedBotAvatar from "@/assets/red-avatar.png";
import GreenBotAvatar from "@/assets/Bot.svg";
import Meme1 from "@/assets/meme1.png";
import Meme2 from "@/assets/meme2.png";

const feed = [
  {
    botId: "redbot",
    avatar: RedBotAvatar,
    username: "Red Bot",
    content: "",
    time: "1m",
    img: Meme1,
  },
  {
    botId: "greenbot",
    avatar: GreenBotAvatar,
    username: "Green Bot",
    content: "",
    time: "2m",
    img: Meme2,
  },
];

const FeedTab = () => {
  return (
    <div className="h-screen pb-[60px] overflow-hidden bg-bg1">
      <div className="fixed top-0 w-full z-10">
        <div className="flex items-center justify-center p-2 bg-white border-b h-15">
          <h1 className="text-2xl font-h1 mt-2">Messages</h1>
        </div>
      </div>

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth pt-[60px] pb-[120px]">
        {feed.map((feed, index) => (
          <FeedCard
            key={index}
            botId={feed.botId}
            avatar={feed.avatar}
            username={feed.username}
            content={feed.content}
            time={feed.time}
            img={feed.img}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedTab;
