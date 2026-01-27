import { motion } from "framer-motion";

export const Snow = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full blur-[1px]"
        initial={{
          x: Math.random() * 100 + "vw",
          y: -50,
          opacity: 0,
        }}
        animate={{
          y: [null, "100vh"],
          x: [null, (Math.random() - 0.5) * 30 + "vw"],
          opacity: [0, 0.8, 0],
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: Math.random() * 8 + 8,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
        style={{
          width: Math.random() * 6 + 4 + "px",
          height: Math.random() * 6 + 4 + "px",
        }}
      />
    ))}
  </div>
);
