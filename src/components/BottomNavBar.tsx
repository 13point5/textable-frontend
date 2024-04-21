import { Tabs } from "@/types";
import { cn } from "@/lib/utils";
import {
  BookOpenIcon,
  HomeIcon,
  MessageSquareIcon,
  UserIcon,
} from "lucide-react";

const tabs = [
  {
    id: Tabs.Home,
    label: "Home",
    icon: <HomeIcon size={24} />,
    className: "bg-red1",
  },
  {
    id: Tabs.Chat,
    label: "Chat",
    icon: <MessageSquareIcon size={24} />,
    className: "bg-green1",
  },
  {
    id: Tabs.Learn,
    label: "Learn",
    icon: <BookOpenIcon size={24} />,
    className: "bg-yellow1",
  },
  {
    id: Tabs.Profile,
    label: "Profile",
    icon: <UserIcon size={24} />,
    className: "bg-blue1",
  },
];

type BottomNavBarProps = {
  activeTab: Tabs;
  onTabChange: (tab: Tabs) => void;
};

export const BottomNavBar = ({ activeTab, onTabChange }: BottomNavBarProps) => {
  return (
    <div className="w-full bg-white border-t-2 flex gap-4 items-center justify-between p-2">
      {tabs.map((tab) => (
        <NavItem
          key={tab.id}
          id={tab.id}
          icon={tab.icon}
          label={tab.label}
          active={activeTab === tab.id}
          onClick={onTabChange}
          className={activeTab === tab.id ? tab.className : ""}
        />
      ))}
    </div>
  );
};

type NavItemProps = {
  id: Tabs;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: (tab: Tabs) => void;
  className?: string;
};

const NavItem = ({
  icon,
  label,
  id,
  active,
  onClick,
  className,
}: NavItemProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        `flex gap-2 items-center cursor-pointer px-4 py-2 rounded-full`,
        className
      )}
    >
      {icon}
      {active && <span className="text-sm font-h1 mt-1">{label}</span>}
    </div>
  );
};
