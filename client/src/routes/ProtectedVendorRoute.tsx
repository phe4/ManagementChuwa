import { Navigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useAppSelector } from '../app/hooks';
import { UserStateType } from '../utils/type';
import { useGlobal } from '../hooks/useGlobal';

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedVendorRoute: FC<ProtectedRouteProps> = ({ children}): ReactNode => {
  const user: UserStateType = useAppSelector((state) => state.user);
  const { showMessage } = useGlobal();

  const token: string = user.token;

  if (!token) {
    return <Navigate to="/signin" />;
  }

  if (user.role !== 'Vendor') {
    showMessage("You don't have permission to access this page!");
    // error page
    // return <Navigate to="/error" />
    return <Navigate to="/" />
  }

  return children;
};

export default ProtectedVendorRoute;