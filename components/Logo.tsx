"use client";

import { motion } from "framer-motion";

export function Logo({ className = "w-8 h-8", animate = false }: { className?: string, animate?: boolean }) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: "easeInOut" } 
    }
  };

  const fillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { delay: 1.2, duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Outer Radar/Pulse Rings */}
      <motion.circle 
        cx="50" cy="50" r="42" 
        strokeDasharray="4 8" 
        strokeWidth="3"
        opacity="0.4"
        variants={animate ? pathVariants : {}}
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      />
      <motion.circle 
        cx="50" cy="50" r="28" 
        strokeWidth="2"
        opacity="0.2"
        variants={animate ? pathVariants : {}}
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      />
      
      {/* Main AI Spark / Pulse Star */}
      <motion.path 
        d="M50 12 C50 40, 60 50, 88 50 C60 50, 50 60, 50 88 C50 60, 40 50, 12 50 C40 50, 50 40, 50 12 Z" 
        variants={animate ? pathVariants : {}}
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      />

      {/* Solid Spark Fill Reveal */}
      <motion.path 
        d="M50 12 C50 40, 60 50, 88 50 C60 50, 50 60, 50 88 C50 60, 40 50, 12 50 C40 50, 50 40, 50 12 Z" 
        fill="currentColor"
        variants={animate ? fillVariants : {}}
        initial={animate ? "hidden" : "visible"}
        animate="visible"
      />
    </svg>
  );
}
