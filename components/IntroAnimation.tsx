"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

function IntroStars() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-black animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.id % 3 === 0 ? "4px" : "2px",
            height: star.id % 3 === 0 ? "4px" : "2px",
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function IntroAnimation() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3800); // Wait slightly longer for tracing animation to reveal
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <IntroStars />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            <div className="flex h-[180px] w-[180px] items-center justify-center rounded-[3rem] bg-black text-white shadow-[0_0_80px_rgba(0,0,0,0.15)]">
              <Logo className="h-32 w-32" animate={true} />
            </div>
            <motion.h1 
              className="mt-4 text-5xl font-black tracking-tight text-black sm:text-7xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              PulseRadar AI
            </motion.h1>
            <motion.div 
               className="h-1.5 w-32 mt-4 overflow-hidden rounded-full bg-slate-100"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.5 }}
            >
              <motion.div 
                className="h-full bg-black"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
