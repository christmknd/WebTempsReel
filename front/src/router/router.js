import { createBrowserRouter, redirect } from "react-router-dom";

// Unconnected
import Login from "../views/Login";
import Signup from "../views/Signup";
import Logout from "../views/Logout";
import PageNotFound from "../views/PageNotFound";

// User
import Home from "../views/user/Home";
import UserApp from "../views/user/UserApp";
import ServiceClient from "../views/user/ServiceClient";

// Admin
import AdminApp from "../views/admin/AdminApp";
import SavAdmin from "../views/admin/SavAdmin";
import Chat from "../views/PrivateChat";
import RoomManagement from "../views/admin/RoomManagement";
import AnnonceCommercial from "../views/admin/AnnonceCommercial";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserApp />,
    errorElement: <PageNotFound />,
    loader: () => {
      if (localStorage.getItem("role") !== "user") throw redirect("/login");
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "service-client",
        element: <ServiceClient />,
      },
      {
        path: "private-chat",
        element: <Chat />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    errorElement: <PageNotFound />,
    loader: () => {
      if (localStorage.getItem("role") !== "admin") throw redirect("/login");
    },
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "sav-admin",
        element: <SavAdmin />,
      },
      {
        path: "annonce-commerciale",
        element: <AnnonceCommercial />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "room-management",
        element: <RoomManagement />,
      }
    ],
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
    loader: () => {
      throw redirect("/login");
    },
  },
]);
