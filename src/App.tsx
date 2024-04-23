import { useState } from "react";
import { PasswordPage } from "@/PasswordPage";
import MainApp from "@/MainApp";

function App() {
  const [allowed, setAllowed] = useState(false);

  if (!allowed) return <PasswordPage setAllowed={setAllowed} />;

  return <MainApp />;
}

export default App;
