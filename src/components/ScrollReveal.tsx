import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  once?: boolean;
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, margin: "-50px" });
  const offset = directionMap[direction];
  const shouldMinimizeMotion = reduceMotion || isMobile;

  return (
    <motion.div
      ref={ref}
      initial={shouldMinimizeMotion ? { opacity: 0 } : { opacity: 0, ...offset }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : shouldMinimizeMotion
            ? { opacity: 0 }
            : { opacity: 0, ...offset }
      }
      transition={{ duration: shouldMinimizeMotion ? 0.22 : duration, delay: shouldMinimizeMotion ? 0 : delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
