import { Navigate } from 'react-router-dom';
import { FC, useMemo, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children}): ReactNode => {
  const token: string | null = useMemo(() => localStorage.getItem('token'), []);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;