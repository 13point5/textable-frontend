import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const MessageComposer = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex gap-2 items-center p-2 bg-slate-50">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 p-2 bg-slate-50 rounded-lg"
      />
      <Button variant="default" size="icon">
        <ArrowRightIcon />
      </Button>
    </div>
  );
};
