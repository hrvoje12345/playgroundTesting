import { FC } from 'react';
import { Button } from '../../components/Button/Button';
import './login.css';

const { REACT_APP_API_URL } = process.env;

export const Login: FC = () => {
  const verifyUser = async () => {
    window.location.href = `${REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className="login-main_container">
      <h3 className="login-title">Login</h3>

      <Button onClick={() => verifyUser()} label="Login with Google" />
    </div>
  );
};
