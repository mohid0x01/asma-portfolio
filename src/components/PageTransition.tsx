import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const minimizeMotion = isMobile || reduceMotion;

  return (
    <motion.div
      initial={minimizeMotion ? { opacity: 0.98 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={minimizeMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
      transition={{ duration: minimizeMotion ? 0.18 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
