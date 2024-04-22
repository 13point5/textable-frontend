import RedBot from "@/assets/redbot.png";
import { MomentCard } from "@/components/moment-card";
import RedBotAvatar from "@/assets/red-avatar.png";
import GreenBotAvatar from "@/assets/Bot.svg";
import Meme1 from "@/assets/meme1.png";
import Meme2 from "@/assets/meme2.png";
import { SendPostDialog } from "@/components/home-tab/send-post-dialog";

const HomeTab = () => {
  return (
    <div className="flex-1 px-4 py-4 flex flex-col gap-8 h-full max-h-full overflow-auto bg-bg1">
      <div className="mt-[60px] relative flex flex-col gap-1 bg-red2 px-8 py-6 rounded-lg">
        <img
          src={RedBot}
          alt="Red Bot"
          className="absolute -top-16 -right-4 w-32 h-32"
        />
        <span className="text-2xl font-h1">Bonjour!</span>
        <span>
          You have made 3 friends this week in textoverse! You are doing an
          amazing job! Keep it up!
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-h2">Moments</h2>
        <MomentCard
          avatar={RedBotAvatar}
          username="Red Bot"
          content="I love Pain??"
          time="10 mins ago"
          likes={10}
          img={Meme1}
        />
        <MomentCard
          avatar={GreenBotAvatar}
          username="Green Bot"
          content="Just saw this, so TRUE, HAHAHA!"
          time="4 hours ago"
          likes={0}
          img={Meme2}
        />
      </div>

      <SendPostDialog />
    </div>
  );
};

export default HomeTab;
