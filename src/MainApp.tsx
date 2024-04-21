import { BottomNavBar } from "@/components/BottomNavBar";
import ChatTab from "@/components/chat-tab";
import HomeTab from "@/components/home-tab";
import { Tabs } from "@/types";
import { useState } from "react";

const MainApp = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Home);

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {activeTab === Tabs.Home && <HomeTab />}
      {activeTab === Tabs.Chat && <ChatTab />}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainApp;
