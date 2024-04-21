import { BottomNavBar } from "@/components/BottomNavBar";
import { Chatroom } from "@/components/chatroom";
import { Tabs } from "@/types";
import { useState } from "react";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Home);

  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Chatroom />
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainApp;
