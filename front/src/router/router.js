import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import ChatRoom from "../views/ChatRoom";
import WSTest from "../components/WSTest";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/chatroom",
    element: <ChatRoom/>,
  },
  {
    path: "/websocket",
    element: <WSTest/>,
  },
]);
