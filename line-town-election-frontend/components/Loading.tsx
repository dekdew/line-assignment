import { MotionConfig, motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="absolute top-1/2 translate-x-[-50%] left-1/2 translate-y-[-50%]">
      <div className="flex gap-3 justify-center">
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ type: "spring", repeat: Infinity, delay: 0 }}
          className="w-5 h-5 bg-white rounded-full shadow-sm"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ type: "spring", repeat: Infinity, delay: 0.1 }}
          className="w-5 h-5 bg-white rounded-full shadow-sm"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ type: "spring", repeat: Infinity, delay: 0.2 }}
          className="w-5 h-5 bg-white rounded-full shadow-sm"
        />
      </div>
    </div>
  );
};

export default Loading;
