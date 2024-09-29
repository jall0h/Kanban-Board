import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import { PrivateRoute } from "./PrivateRoute";
import RegistrationPage from "../Auth/RegistrationPage";
import LoginPage from "../Auth/LoginPage";

const Routes = () => {
  const token = localStorage.getItem("accessToken");
  const nonAuthenticatedRoutes = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      element: <PrivateRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
    ...(!token ? nonAuthenticatedRoutes : []),
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
