import { motion } from "framer-motion";

export const Fireflies = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-amber-200 rounded-full mix-blend-screen shadow-[0_0_10px_rgba(253,224,71,0.8)]"
        initial={{
          x: Math.random() * 100 + "vw",
          y: Math.random() * 100 + "vh",
          opacity: 0,
          scale: 0,
        }}
        animate={{
          y: [null, Math.random() * -100 - 50],
          x: [null, Math.random() * 50 - 25],
          opacity: [0, 0.8, 0],
          scale: [0, Math.random() * 1.5, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
        style={{
          width: Math.random() * 4 + 2 + "px",
          height: Math.random() * 4 + 2 + "px",
        }}
      />
    ))}
  </div>
);
