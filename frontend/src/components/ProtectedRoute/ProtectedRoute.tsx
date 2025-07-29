import { useEffect, useState, ReactNode, FC } from 'react';

const { REACT_APP_API_URL } = process.env;

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkIfAunthenticated = async () => {
      const isAuthenticatedResponse = await fetch(
        `${REACT_APP_API_URL}/auth/check`,
        {
          credentials: 'include',
        },
      );

      setIsAuthenticated(isAuthenticatedResponse.ok);
    };

    checkIfAunthenticated();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
  }

  return <>{children}</>;
};
