import React from "react";

const Button = ({
  children,
  className = "",
  fullWidth = false,
}: {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}) => {
  return (
    <button
      className={`bg-[#391A5B] hover:bg-[#291245] text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
