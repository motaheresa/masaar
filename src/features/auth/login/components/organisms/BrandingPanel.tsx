// src/components/organisms/BrandingPanel.tsx
import { motion } from "framer-motion";
import { LoginLogo } from "@/components/molecules/Logos";

export const BrandingPanel = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary-hover items-center justify-center p-12"
    >
      <div className="text-center text-white">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <LoginLogo size="lg" className="text-white mb-4 justify-center" />
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl font-semibold mb-4 leading-relaxed"
        >
          Unlock Your Code Potential.
          <br />
          Connect with experts Mentors
        </motion.h2>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ 
            duration: 0.3, 
            delay: 0.6,
            hover: { duration: 0.2 }
          }}
          className="mt-8 px-8 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-primary transition duration-200"
        >
          Join Us
        </motion.button>
      </div>
    </motion.div>
  );
};