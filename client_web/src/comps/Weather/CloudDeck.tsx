import { motion } from "framer-motion";

export const CloudDeck = ({ darkMode }: { darkMode: boolean }) => {
  const cloudColor = darkMode ? "#020617" : "#1e293b";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45vh] z-15 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: ["0%", "-25%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
        className="absolute -left-[50%] w-[200%] h-full bottom-0"
        style={{
          background: `linear-gradient(to top, ${cloudColor} 20%, transparent 100%)`,
          borderTopLeftRadius: "60% 100%",
          borderTopRightRadius: "50% 80%",
          filter: "blur(50px)",
          transform: "translateY(15%) scaleY(1.2)"
        }}
      />
      <motion.div
        animate={{ x: ["-10%", "5%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
        className="absolute -left-[25%] w-[150%] h-[60%] bottom-0 opacity-70"
        style={{
          background: `linear-gradient(to top, ${cloudColor} 10%, transparent 100%)`,
          borderTopLeftRadius: "40% 100%",
          borderTopRightRadius: "70% 100%",
          filter: "blur(30px)",
          transform: "translateY(10%)"
        }}
      />
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-${darkMode ? 'slate-950' : 'slate-900'} to-transparent blur-xl`} />
    </div>
  );
};
