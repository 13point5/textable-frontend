import { Chatroom } from "./components/chatroom";

function App() {
  return (
    <h1 className="w-screen h-screen flex justify-center">
      <div className="w-full max-w-[500px]">
        <Chatroom />
      </div>
    </h1>
  );
}

export default App;
