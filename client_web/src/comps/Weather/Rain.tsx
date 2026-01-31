import { motion } from "framer-motion";

export const Rain = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-cyan-200/40 w-[2px] h-10 blur-[1px]"
        initial={{
          x: Math.random() * 120 + "vw",
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: ["0vh", "100vh"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 0.5 + 0.4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
        style={{
          height: Math.random() * 30 + 20 + "px",
          transform: "rotate(20deg)",
        }}
      />
    ))}
  </div>
);
