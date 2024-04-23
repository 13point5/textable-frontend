import { BottomNavBar } from "@/components/BottomNavBar";
import ChatTab from "@/components/chat-tab";
import HomeTab from "@/components/home-tab";
import useHomeStore from "@/lib/home-store";
import { Tabs } from "@/types";

const MainApp = () => {
  const { activeTab, setActiveTab } = useHomeStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {activeTab === Tabs.Home && <HomeTab />}
      {activeTab === Tabs.Chat && <ChatTab />}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainApp;
