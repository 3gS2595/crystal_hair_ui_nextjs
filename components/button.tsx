import React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
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
