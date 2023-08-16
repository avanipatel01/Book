import { Navigate, useRoutes } from "react-router-dom";
import { SignUp } from "../src/pages/signup.js";
import DashboardLayout from "./layouts/DashboardLayout";
import Books from "./pages/book.js";
import Author from "../src/pages/author.js";
import ErrorPage from "../src/pages/404.js";
import AuthLayout from "./layouts/AuthLayout/index";
import { SignIn } from "./pages/signin";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("authorization");
  return token ? children : <Navigate to="/" />;
  // if (token) {
  //   return children;
  // }

  // <Navigate to="/" />;
};

const AuthRoutes = ({ children }) => {
  const token = localStorage.getItem("authorization");
  return !token ? children : <Navigate to="/dashboard" />;
};

function AuthRoute() {
  let element = useRoutes([
    {
      element: (
        <AuthRoutes>
          <AuthLayout />
        </AuthRoutes>
      ),
      children: [
        { path: "/", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
    {
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        { path: "/dashboard", element: <Books /> },
        { path: "/author", element: <Author /> },
        { path: "/help", element: <ErrorPage /> },
      ],
    },
    {
      path: "*",
      element: <>Page not found..</>,
    },
  ]);
  return element;
}

export default AuthRoute;
