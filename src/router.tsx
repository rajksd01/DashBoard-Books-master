import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home.page";
import Login from "./Pages/Login.page";
import Register from "./Pages/Register.page";
import DashBoard from "./Layout/DashBoard.layout";
import Book from "./Pages/Book.page";
import Auth from "./Layout/Auth.layout";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <DashBoard />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "books",
        element: <Book />,
      },
    ],
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/auth/login" />,
  },
]);

export default router;
