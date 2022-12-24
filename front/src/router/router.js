import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import ChatRoom from "../views/ChatRoom";
import ServiceClient from "../views/ServiceClient";
import WSTest from "../components/WSTest";
import Admin from "../views/Admin";
import PageNotFound from "../views/PageNotFound";

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
    path: "/admin",
    element: <Admin/>
  },

  {
    path: "*",
    element: <PageNotFound/>
  }
]);
