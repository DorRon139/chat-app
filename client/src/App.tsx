import Messanger from "./pages/Messanger";
import { Provider } from "react-redux";
import io from "socket.io-client";

import store from "./app/store";
import "./App.css";

const socket = io("http://localhost:3050");

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Messanger socket={socket} />
      </div>
    </Provider>
  );
}

export default App;
