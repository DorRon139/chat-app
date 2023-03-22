import Messanger from "./pages/messanger/Messanger";
import io from "socket.io-client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import store from "./app/store";
import Navigation from "./components/shared/navigation/Navigation";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./App.css";

const socket = io("http://localhost:3050");
const queryCient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      { index: true, element: <Messanger socket={socket} /> },
      { path: "/login", element: <Login /> },
      { path: "signin", element: <Register /> },
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryCient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
