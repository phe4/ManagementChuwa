import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import ErrorPage from "./routes/Error";
import Signin from "./routes/Signin";
import Products from "./routes/Products";
import Signup from "./routes/Signup.tsx";
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Signin />,
        errorElement: <ErrorPage />
      },
      {
        path: '/signup',
        element: <Signup />,
        errorElement: <ErrorPage />
      },
      {
        path: '/products',
        element: <Products />,
        errorElement: <ErrorPage />
      }
    ]
  },
]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
