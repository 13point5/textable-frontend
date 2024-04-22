import RedBot from "@/assets/red-avatar.svg";
import GreenBot from "@/assets/green-avatar.svg";
import PurpleBot from "@/assets/purple-bot.svg";

export const botData: Record<
  string,
  {
    name: string;
    avatar: string;
  }
> = {
  redbot: {
    name: "PierreBot",
    avatar: RedBot,
  },
  greenbot: {
    name: "MaxBot",
    avatar: GreenBot,
  },
  purplebot: {
    name: "AmélieBot",
    avatar: PurpleBot,
  },
};
