"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static random positions on client side to avoid hydration mismatch
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3, // random animation delay
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-white overflow-hidden">
      {/* Light structural grid */}
      <div className="radar-grid absolute inset-0 opacity-60" />

      {/* Blinking Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-black animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.id % 3 === 0 ? "3px" : "2px",
              height: star.id % 3 === 0 ? "3px" : "2px",
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

