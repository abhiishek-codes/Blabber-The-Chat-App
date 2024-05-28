import React from "react";
import ReactDom from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginSignup from "./pages/LoginSignup";
import { UserProvider } from "./utils/userContext";
import ChatPage from "./pages/ChatPage";
import Error from "./components/Chat/Error.jsx";

const App = () => {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
      </UserProvider>
    </>
  );
};

const Chatpage = () => {
  return (
    <UserProvider>
      <ChatPage />
    </UserProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <LoginSignup />,
      },
      {
        path: "/login",
        element: <LoginSignup />,
      },
    ],
  },
  {
    path: "/chats",
    element: <Chatpage />,
    errorElement: <Error />,
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
