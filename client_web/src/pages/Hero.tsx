import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ChevronRight, Sparkles, Play, X } from "lucide-react";
import { SLIDES } from "../data/slides"; 
import { WeatherSystem } from "../comps/Weather/WeatherSystem"; 
import { CloudDeck } from "../comps/Weather/CloudDeck"; 

interface HeroProps {
  darkMode: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 10 }
  }
};

const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 200]);
  const navigate = useNavigate(); // ✅ hook for navigation

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slide = SLIDES[currentSlide];

  const handleDragEnd = (offsetX: number) => {
    if (offsetX < -50) setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    if (offsetX > 50) setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleStartReading = () => {
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <div
      className={`relative w-full h-[100vh] overflow-hidden ${darkMode ? "bg-slate-950" : "bg-black"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Overlay to tone down bright blue/solid backgrounds from slide images */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Weather Effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <WeatherSystem type={slide.weather} />
      </div>
      <CloudDeck darkMode={darkMode} />

      {/* Main Content */}
      <motion.div
        style={{ y: yParallax }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => handleDragEnd(info.offset.x)}
        className="relative z-20 w-11/12 mx-auto h-full flex items-center pb-20"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-4xl pt-20"
          >
            {/* Subtitle */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-xl shadow-lg ${darkMode ? "border-white/10 text-white bg-white/5" : "border-white/40 text-white bg-white/10"}`}>
                <Sparkles size={12} className={slide.accent} /> {slide.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <div className="mb-8 relative">
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-white drop-shadow-2xl">
                {slide.title.split(" ").map((word, i) => (
                  <motion.span 
                    key={i} 
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 60, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.1, type: "spring" as const, bounce: 0.3 }}
                  >
                    <span className={i > 0 && i % 3 === 0 ? `text-transparent bg-clip-text bg-gradient-to-r ${slide.buttonGradient} brightness-125` : ""}>
                      {word}
                    </span>
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl font-medium leading-relaxed max-w-xl mb-12 drop-shadow-lg"
            >
              {slide.description}
            </motion.p>

            {/* Hero Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
              {/* Start Reading button linked to login */}
              <button 
                onClick={handleStartReading}
                className={`relative group px-10 py-5 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1 bg-gradient-to-r ${slide.buttonGradient} ${slide.buttonShadow} shadow-2xl ring-1 ring-white/30`}
              >
                <span className="relative z-30 flex items-center gap-2 drop-shadow-md">
                  Start Reading <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Watch Trailer */}
              <button 
                onClick={() => setTrailerOpen(true)} 
                className="flex items-center gap-3 px-8 py-5 rounded-full font-bold text-lg transition-all border-2 backdrop-blur-xl group shadow-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black transition-transform group-hover:scale-110">
                  <Play size={14} fill="currentColor" />
                </div>
                <span>Watch Trailer</span>
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute right-0 top-0 bottom-0 w-24 hidden md:flex flex-col justify-center items-center z-30">
        <div className="space-y-6">
          {SLIDES.map((s, index) => (
            <div key={s.id} className="relative group cursor-pointer" onClick={() => setCurrentSlide(index)}>
              <div className={`w-1 transition-all duration-500 rounded-full backdrop-blur-md ${currentSlide === index ? `h-16 bg-gradient-to-b ${s.buttonGradient}` : "h-2 bg-white/30 group-hover:h-6 group-hover:bg-white/60"}`} />
              {currentSlide === index && (
                <motion.span 
                  layoutId="activeSlide"
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold rotate-90 w-max origin-right ${s.accent} drop-shadow-md`}
                >
                  0{index + 1}
                </motion.span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      {trailerOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/VIDEO_ID" 
              title="Trailer"
              allowFullScreen
            />
            <button 
              onClick={() => setTrailerOpen(false)}
              className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
