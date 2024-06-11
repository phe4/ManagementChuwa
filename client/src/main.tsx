import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import ErrorPage from "./routes/Error";
import Signin from "./routes/Signin";
import Products from "./routes/Products";
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
        path: '/products',
        element: <Products />,
        errorElement: <ErrorPage />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
