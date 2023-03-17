import Messanger from "./pages/Messanger";
import io from "socket.io-client";
import { useContext } from "react";
import "./App.css";

const socket = io("http://localhost:3050");

function App() {
  return (
    <>
      <div className="App">
        <Messanger socket={socket} />
      </div>
    </>
  );
}

export default App;
