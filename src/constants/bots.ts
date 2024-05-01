import RedBot from "@/assets/red-avatar.svg";
import GreenBot from "@/assets/green-avatar.svg";
import PurpleBot from "@/assets/purple-bot.svg";

export const botData: Record<
  string,
  {
    name: string;
    avatar: string;
    voiceId: string;
  }
> = {
  redbot: {
    name: "PierreBot",
    avatar: RedBot,
    voiceId: "CYw3kZ02Hs0563khs1Fj",
  },
  greenbot: {
    name: "MaxBot",
    avatar: GreenBot,
    voiceId: "GBv7mTt0atIp3Br8iCZE",
  },
  purplebot: {
    name: "AmélieBot",
    avatar: PurpleBot,
    voiceId: "XB0fDUnXU5powFXDhCwa",
  },
};
