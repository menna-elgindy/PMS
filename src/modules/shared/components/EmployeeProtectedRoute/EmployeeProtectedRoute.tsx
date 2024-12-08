import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

interface employeeProtectedRouteProps {
  children: ReactNode;
}

const EmployeeProtectedRoute = ({ children }: employeeProtectedRouteProps) => {
  const { loginData } = useContext(AuthContext);

  if (loginData?.userGroup === "Manager" ) {
    return <>{children}</>;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default EmployeeProtectedRoute;
