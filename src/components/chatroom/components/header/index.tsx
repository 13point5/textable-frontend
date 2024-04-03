import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="flex justify-between items-center p-2 bg-slate-50">
      <Button variant="ghost" size="icon">
        <ArrowLeftIcon />
      </Button>

      <p className="text-lg font-medium">CocoBot</p>

      <Button variant="ghost" size="icon">
        <MenuIcon />
      </Button>
    </div>
  );
};
