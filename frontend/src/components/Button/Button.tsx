import { FC, ReactNode } from 'react';
import './button.css';

interface ButtonProps {
  icon?: ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isSecondary?: boolean;
  label: ReactNode | string;
  onClick: () => void;
  showSkeleton?: boolean;
  type?: 'button' | 'submit';
}

export const Button: FC<ButtonProps> = ({
  isDisabled = false,
  isLoading = false,
  label,
  onClick,
  type = 'button',
}) => (
  <button
    className="button-button_container"
    type={type}
    onClick={onClick}
    disabled={isDisabled || isLoading}
  >
    {isLoading ? <div>Loading...</div> : <div className="mx-auto">{label}</div>}
  </button>
);
