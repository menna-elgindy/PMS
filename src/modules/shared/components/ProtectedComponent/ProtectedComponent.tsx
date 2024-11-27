import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

interface ProtectedComponentProps {
  children: ReactNode;
}

const ProtectedComponent = ({ children }: ProtectedComponentProps) => {
  const { loginData } = useContext(AuthContext);

  if (localStorage.getItem('token') || loginData) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedComponent;
