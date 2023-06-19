import React from "react";

interface Props {
  border: string;
  color: string;
  children?: React.ReactNode;
  height: string;
  onClick: () => void;
  radius: string
  width: string;
}

const Button: React.FC<Props> = ({ 
    children,
    onClick, 
  }) => { 
  return (
    <button id="dm" 
      onClick={onClick}

    >
    {children}
    </button>
  );
}

export default Button;
