import { motion } from "framer-motion";
import React, { useState } from "react";
import { isMobile } from "react-device-detect";

interface IButton {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  disabled?: boolean;
  className?: string;
}

const Button = ({
  onClick,
  children,
  type = "primary",
  disabled,
  className,
}: IButton) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className={className}>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        initial={{
          boxShadow: "0 1px 5px 0 #0000",
        }}
        animate={{
          boxShadow: isHover
            ? "0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.3)"
            : "0 1px 3px 0 rgba(0,0,0,0), 0 1px 2px -1px rgba(0,0,0,0)",
        }}
        whileTap={
          !disabled
            ? {
                scale: 0.95,
              }
            : {}
        }
        transition={{ type: "spring", duration: 0.3 }}
        onMouseEnter={() => {
          if (isMobile) return null;
          setIsHover(true);
        }}
        onMouseLeave={() => {
          if (isMobile) return null;
          setIsHover(false);
        }}
        className={`${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-primary text-white"
        } ${
          type === "secondary" ? "bg-transparent text-gray-600 border" : ""
        } w-full relative bottom-0 rounded py-2 mt-5 md:mt-3 text-sm shadow-sm`}
      >
        {children}
      </motion.button>
    </div>
  );
};

export default Button;
