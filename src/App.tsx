import { useState } from "react";
import { Chatroom } from "./components/chatroom";
import { PasswordPage } from "@/PasswordPage";

function App() {
  const [allowed, setAllowed] = useState(false);

  if (!allowed) return <PasswordPage setAllowed={setAllowed} />;

  return <Chatroom />;
}

export default App;
