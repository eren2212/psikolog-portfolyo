import React from "react";

const Button = ({
  children,
  className = "",
  fullWidth = false,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-purple-500",
    secondary:
      "bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 shadow-md hover:shadow-lg focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseClasses} ${
        variantClasses[variant]
      } px-6 py-3 rounded-xl text-sm ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
