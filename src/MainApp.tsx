import { BottomNavBar } from "@/components/BottomNavBar";
import ChatTab from "@/components/chat-tab";
import FeedTab from "@/components/feed-tab";
import TextoverseTab from "@/components/textoverse-tab";
import useHomeStore from "@/lib/home-store";
import { Tabs } from "@/types";

const MainApp = () => {
  const { activeTab, setActiveTab } = useHomeStore((state) => ({
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
  }));

  return (
    <div className="h-screen max-h-screen overflow-hidden">
      {activeTab === Tabs.Feed && <FeedTab />}
      {activeTab === Tabs.Chat && <ChatTab />}
      {activeTab === Tabs.Textoverse && <TextoverseTab />}
      <BottomNavBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainApp;
