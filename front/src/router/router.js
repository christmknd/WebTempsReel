import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import ChatRoom from "../views/ChatRoom";
import ServiceClient from "../views/ServiceClient";
import WSTest from "../components/WSTest";
import PageNotFound from "../views/PageNotFound";
import Login from "../views/Login";
import Signup from "../views/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/service-client",
    element: <ServiceClient />,
  },
  {
    path: "/chatroom",
    element: <ChatRoom />,
  },
  {
    path: "/websocket",
    element: <WSTest />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
