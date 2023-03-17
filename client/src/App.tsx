import Messanger from "./pages/messanger/Messanger";
import { Provider } from "react-redux";
import io from "socket.io-client";

import store from "./app/store";
import "./App.css";
import Login from "./pages/login/Login";

const socket = io("http://localhost:3050");

function App() {
  return (
    <Provider store={store}>
      {/* <div className="App">
        <Messanger socket={socket} />
      </div> */}
      <Login />
    </Provider>
  );
}

export default App;
