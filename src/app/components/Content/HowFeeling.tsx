"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";

const HowFeeling = () => {
  const [breathingPhase, setBreathingPhase] = useState<
    "inhale" | "exhale" | "hold"
  >("inhale");
  const [isBreathing, setIsBreathing] = useState(true);
  const leftBoxRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth eye movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for eyes
  const eyeX = useSpring(mouseX, { stiffness: 100, damping: 10 });
  const eyeY = useSpring(mouseY, { stiffness: 100, damping: 10 });

  // Breathing animation controls
  const breathingControls = useAnimation();

  // Mouse tracking for eyes with constrained movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (leftBoxRef.current) {
        const rect = leftBoxRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate relative position
        const relativeX = e.clientX - centerX;
        const relativeY = e.clientY - centerY;

        // Constrain eye movement to a smaller range
        const maxMovement = 8; // Reduced from 15
        const constrainedX = Math.max(
          -maxMovement,
          Math.min(maxMovement, relativeX / 20)
        );
        const constrainedY = Math.max(
          -maxMovement,
          Math.min(maxMovement, relativeY / 20)
        );

        mouseX.set(constrainedX);
        mouseY.set(constrainedY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Improved breathing cycle
  useEffect(() => {
    if (!isBreathing) return;

    const runBreathingCycle = async () => {
      while (isBreathing) {
        // Inhale phase (4 seconds)
        setBreathingPhase("inhale");
        await breathingControls.start({
          scale: 1.3,
          transition: { duration: 4, ease: "easeInOut" },
        });

        // Hold phase (1 second)
        setBreathingPhase("hold");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Exhale phase (4 seconds)
        setBreathingPhase("exhale");
        await breathingControls.start({
          scale: 1,
          transition: { duration: 4, ease: "easeInOut" },
        });

        // Hold phase (1 second)
        setBreathingPhase("hold");
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    runBreathingCycle();

    return () => setIsBreathing(false);
  }, [breathingControls, isBreathing]);

  const breathingTexts = {
    inhale: "Nefes Al",
    exhale: "Nefes Ver",
    hold: "Tut",
  };

  const moodOptions = ["Mutlu", "Üzgün", "Sinirli", "Kaygılı", "Nötr"];

  return (
    <motion.section
      className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 rounded-4xl mt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center ml-10">
        {/* Sol taraf - Mood tracking with animated eyes */}
        <motion.div
          ref={leftBoxRef}
          className="bg-gradient-to-br from-purple-200 to-purple-300 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${15 + i * 8}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>

          {/* Animated Eyes */}
          <div className="relative z-10 mb-8">
            <div className="flex justify-center items-center gap-8 mb-8">
              {[0, 1].map((eyeIndex) => (
                <motion.div
                  key={eyeIndex}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + eyeIndex * 0.1, type: "spring" }}
                >
                  <motion.div
                    className="w-8 h-8 bg-gray-800 rounded-full"
                    style={{
                      x: eyeX,
                      y: eyeY,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Bugün nasıl hissediyorsun?
          </motion.h3>

          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            {moodOptions.map((mood, index) => (
              <motion.button
                key={mood}
                className="px-6 py-3 bg-white/80 text-gray-700 rounded-full font-medium shadow-md backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {mood}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sağ taraf - Breathing exercise */}
        <motion.div
          className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl mr-10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-2xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Hadi, daha iyi hissetmen için kısa bir nefes egzersizi yapalım.
            </motion.h3>

            {/* Breathing animation container */}
            <div className="relative w-80 h-80 mx-auto mb-8">
              {/* Main breathing circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-40 h-40 rounded-full border-4 border-white/30 flex items-center justify-center"
                  animate={breathingControls}
                  initial={{ scale: 1 }}
                >
                  <motion.div
                    className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                    animate={{
                      scale: breathingPhase === "inhale" ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.span
                      className="text-blue-600 font-bold text-lg"
                      key={breathingPhase} // Force re-render on phase change
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {breathingTexts[breathingPhase]}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Phase indicators */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[
                  { phase: "inhale", position: "top" },
                  { phase: "hold", position: "right" },
                  { phase: "exhale", position: "bottom" },
                  { phase: "hold", position: "left" },
                ].map((indicator, index) => {
                  const positions = {
                    top: "-top-8 left-1/2 -translate-x-1/2",
                    right: "-right-8 top-1/2 -translate-y-1/2",
                    bottom: "-bottom-8 left-1/2 -translate-x-1/2",
                    left: "-left-8 top-1/2 -translate-y-1/2",
                  };

                  return (
                    <motion.div
                      key={`${indicator.phase}-${index}`}
                      className={`absolute transform ${
                        positions[indicator.position as keyof typeof positions]
                      }`}
                    >
                      <motion.div
                        className="w-3 h-3 rounded-full bg-white"
                        animate={{
                          scale: breathingPhase === indicator.phase ? 1.5 : 1,
                          opacity: breathingPhase === indicator.phase ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* Floating particles around breathing circle */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/50 rounded-full"
                  style={{
                    left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 120}px`,
                    top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 120}px`,
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>

            {/* Instructions */}
            <motion.p
              className="text-white/90 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              Daire ile birlikte nefes alın ve verin
            </motion.p>

            {/* Breathing control */}
            <motion.button
              className="mt-6 px-6 py-2 bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/30"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBreathing(!isBreathing)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              {isBreathing ? "Duraklat" : "Başlat"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowFeeling;
