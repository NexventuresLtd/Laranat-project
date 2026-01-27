import { motion, AnimatePresence } from "framer-motion";
import type { WeatherType } from "../../Types/index";

const Fireflies = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-amber-200 rounded-full mix-blend-screen shadow-[0_0_10px_rgba(253,224,71,0.8)]"
        initial={{ x: Math.random() * 100 + "vw", y: Math.random() * 100 + "vh", opacity: 0, scale: 0 }}
        animate={{ y: [null, Math.random() * -100 - 50], x: [null, Math.random() * 50 - 25], opacity: [0, 0.8, 0], scale: [0, Math.random() * 1.5, 0] }}
        transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        style={{ width: Math.random() * 4 + 2 + "px", height: Math.random() * 4 + 2 + "px" }}
      />
    ))}
  </div>
);

const Rain = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-cyan-200/40 w-[2px] h-10 blur-[1px]"
        initial={{ x: Math.random() * 120 + "vw", y: -100, opacity: 0 }}
        animate={{ y: ["0vh", "100vh"], opacity: [0, 1, 0] }}
        transition={{ duration: Math.random() * 0.5 + 0.4, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
        style={{ height: Math.random() * 30 + 20 + "px", transform: "rotate(20deg)" }}
      />
    ))}
  </div>
);

const Snow = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(50)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full blur-[1px]"
        initial={{ x: Math.random() * 100 + "vw", y: -50, opacity: 0 }}
        animate={{ y: [null, "100vh"], x: [null, (Math.random() - 0.5) * 30 + "vw"], opacity: [0, 0.8, 0], rotate: Math.random() * 360 }}
        transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
        style={{ width: Math.random() * 6 + 4 + "px", height: Math.random() * 6 + 4 + "px" }}
      />
    ))}
  </div>
);

export const WeatherSystem = ({ type }: { type: WeatherType }) => {
  return (
    <AnimatePresence mode="wait">
      {type === "fireflies" && <motion.div key="fireflies" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Fireflies /></motion.div>}
      {type === "rain" && <motion.div key="rain" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Rain /></motion.div>}
      {type === "snow" && <motion.div key="snow" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><Snow /></motion.div>}
    </AnimatePresence>
  );
};
