// src/components/molecules/FormDivider.tsx
import React from "react";
import { motion } from "framer-motion";

type FormDividerProps = {
  text?: string;
  delay?: number;
};

export const FormDivider = ({ text = "or continue with", delay = 0 }: FormDividerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative my-6"
    >
      <div className="absolute inset-0 flex items-center">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.1 }}
          className="w-full border-t border-gray-300 origin-left"
        />
      </div>
      <div className="relative flex justify-center text-sm">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
          className="px-4 bg-white text-gray-500"
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
};