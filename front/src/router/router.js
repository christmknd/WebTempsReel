import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import ChatRoom from "../views/ChatRoom";
import ServiceClient from "../views/ServiceClient";
import WSTest from "../components/WSTest";
import PageNotFound from "../views/PageNotFound";
import Login from "../views/Login";
import Signup from "../views/Signup";
import ProtectedRoute from "../components/ProtectedRoute";
import Logout from "../views/Logout";
import Chat from "../views/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/service-client",
    element: (
      <ProtectedRoute>
        <ServiceClient />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chatroom",
    element: (
      <ProtectedRoute>
        <ChatRoom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/websocket",
    element: (
      <ProtectedRoute>
        <WSTest />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
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
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
