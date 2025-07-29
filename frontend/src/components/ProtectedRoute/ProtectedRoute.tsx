import { useEffect, useState, ReactNode, FC } from 'react';
import { Navigate } from 'react-router-dom';

const {REACT_APP_API_URL} = process.env

type ProtectedRouteProps = {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkIfAunthenticated = async () => {
    const isAuthenticatedResponse = await fetch(`${REACT_APP_API_URL}/auth/check`, {
      credentials: 'include',
    });

    setIsAuthenticated(isAuthenticatedResponse.ok);
  }

  useEffect(() => {
    checkIfAunthenticated();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  };

  return <>{children}</>;
};

