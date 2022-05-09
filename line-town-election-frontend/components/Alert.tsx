import { motion } from "framer-motion";

const Alert = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 1 }}
        className="bg-red-500 w-full text-white text-center text-sm font-light fixed top-0 z-50"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Alert;
