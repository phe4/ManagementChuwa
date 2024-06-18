import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App.tsx";
import ErrorPage from "../pages/Error.tsx";
import Products from "../pages/Products.tsx";
import Signup from "../pages/Signup.tsx";
import Signin from "../pages/Signin.tsx";
import Password from "../pages/Password.tsx";
import Email from "../pages/Email.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Products />,
        errorElement: <ErrorPage />
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />
      },
      {
        path: '/signin',
        element: <Signin />,
        errorElement: <ErrorPage />
      },
      {
        path: '/password',
        element: <Password />,
        errorElement: <ErrorPage />
      },
      {
        path: '/email',
        element: <Email />,
        errorElement: <ErrorPage />
      }
    ]
  },
]);

export default router;