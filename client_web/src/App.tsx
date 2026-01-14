import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Menu, 
  X, 
  ShoppingBag, 
  Moon, 
  Sun, 
  ChevronRight, 
  Sparkles,
  Play,
} from "lucide-react";

// --- Types ---
type WeatherType = "fireflies" | "rain" | "snow";

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;       
  buttonGradient: string;
  buttonShadow: string;
  weather: WeatherType;
}

// --- Data ---
const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "A World of Endless Adventure",
    subtitle: "LANART21 ORIGINALS",
    description: "Journey to the captivating realms of fantasy to chase the stories that matter. Where every page turn reveals a new horizon.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop", 
    accent: "text-orange-400",
    buttonGradient: "from-orange-500 to-amber-500",
    buttonShadow: "shadow-orange-500/40",
    weather: "fireflies"
  },
  {
    id: 2,
    title: "Echoes of the Demon Blade",
    subtitle: "NEON CHRONICLES",
    description: "In a world where spirits and steel collide, humanity makes its last stand. Witness the breathing techniques in 8K resolution.",
    image: "https://www.hdwallpapers.in/download/demon_slayer_tanjiro_kamado_with_sword_with_blue_background_4k_8k_hd_anime-7680x4320.jpg",
    accent: "text-cyan-300",
    buttonGradient: "from-cyan-500 to-blue-600",
    buttonShadow: "shadow-cyan-500/40",
    weather: "rain"
  },
  {
    id: 3,
    title: "Legends of the Silent Blade",
    subtitle: "SAMURAI SAGA",
    description: "Ancient traditions clash with mystic forces. A tale of honor, steel, and cherry blossoms falling in the wind.",
    image: "https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2692&auto=format&fit=crop",
    accent: "text-rose-400",
    buttonGradient: "from-rose-500 to-red-600",
    buttonShadow: "shadow-rose-500/40",
    weather: "snow"
  },
];

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

// --- Weather Components ---

const Fireflies = () => (
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

const Rain = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(100)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-cyan-200/40 w-[2px] h-10 blur-[1px]"
        initial={{
          x: Math.random() * 120 + "vw", // Wider spread for rain
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: ["0vh", "100vh"],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 0.5 + 0.4, // Faster falling
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

const Snow = () => (
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
          x: [null, (Math.random() - 0.5) * 30 + "vw"], // More swaying
          opacity: [0, 0.8, 0],
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: Math.random() * 8 + 8, // Slower falling
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

const WeatherSystem = ({ type }: { type: WeatherType }) => {
  return (
    <AnimatePresence mode="wait">
      {type === "fireflies" && <motion.div key="fireflies" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0"><Fireflies /></motion.div>}
      {type === "rain" && <motion.div key="rain" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0"><Rain /></motion.div>}
      {type === "snow" && <motion.div key="snow" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0"><Snow /></motion.div>}
    </AnimatePresence>
  );
};

// --- NEW COMPONENT: Animated Cloud Deck ---
// This creates the "cloud structure gradient" that blurs the bottom image.
const CloudDeck = ({ darkMode }: { darkMode: boolean }) => {
  // Using different shades for dark/light mode clouds
  const cloudColor = darkMode ? "#020617" : "#1e293b"; // Slate-950 vs Slate-800

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[45vh] z-15 pointer-events-none overflow-hidden">
      
      {/* Layer 1: Deep, slow-moving cloud bank */}
      <motion.div
        animate={{ x: ["0%", "-25%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "mirror" }}
        className="absolute -left-[50%] w-[200%] h-full bottom-0"
        style={{
           // The gradient fades from solid color at bottom to transparent top
           background: `linear-gradient(to top, ${cloudColor} 20%, transparent 100%)`,
           // Massive border-radius creates the curved "cloud top" shape
           borderTopLeftRadius: "60% 100%",
           borderTopRightRadius: "50% 80%",
           // Heavy blur creates the foggy/cloud texture and blurs the image behind it
           filter: "blur(50px)", 
           transform: "translateY(15%) scaleY(1.2)" 
        }}
      />

       {/* Layer 2: Shallower, faster-moving foreground clouds for parallax depth */}
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
      
      {/* Final solid gradient at very bottom to ensure text readability */}
       <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-${darkMode ? 'slate-950' : 'slate-900'} to-transparent blur-xl`} />
    </div>
  );
};


// --- Navbar ---

const Navbar = ({ darkMode, toggleTheme }: { darkMode: boolean; toggleTheme: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* THE SCRIM: Top gradient for visibility */}
      <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-40 pointer-events-none transition-opacity duration-500" 
           style={{ opacity: scrolled ? 0 : 1 }} 
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? darkMode 
              ? "py-3 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50 shadow-2xl" 
              : "py-3 bg-white/80 backdrop-blur-lg border-b border-white/30 shadow-lg"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="w-11/12 mx-auto flex items-center justify-between relative z-50">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-xl rotate-45 transition-transform duration-500 group-hover:rotate-180 ${darkMode ? "bg-orange-500" : "bg-orange-600"}`} />
              <div className={`absolute inset-0 rounded-xl rotate-45 scale-75 blur-sm opacity-50 ${darkMode ? "bg-orange-400" : "bg-orange-300"}`} />
              <span className="relative z-10 font-bold text-white text-xl">L</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className={`font-bold text-lg tracking-widest drop-shadow-lg ${scrolled && !darkMode ? "text-slate-900" : "text-white"}`}>
                LANART
              </span>
              <span className="text-[0.6rem] font-medium tracking-[0.3em] text-orange-500 drop-shadow-md">CREATIVE</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            {["Home", "Portfolio", "Comics", "About"].map((item) => (
              <div key={item} className="relative group cursor-pointer py-2">
                <span className={`text-sm font-semibold tracking-wide transition-colors drop-shadow-md ${
                  scrolled 
                    ? darkMode ? "text-slate-300 group-hover:text-white" : "text-slate-600 group-hover:text-orange-600"
                    : "text-slate-100 group-hover:text-white" 
                }`}>
                  {item}
                </span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300 w-0 group-hover:w-full`} />
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={toggleTheme} className={`transition-transform hover:rotate-12 ${scrolled && !darkMode ? "text-slate-600" : "text-white"}`}>
              {darkMode ? <Sun size={20} className="drop-shadow-md"/> : <Moon size={20} className="drop-shadow-md" />}
            </button>
            
            <div className="flex items-center gap-4">
              <ShoppingBag className={`cursor-pointer transition-transform hover:scale-110 drop-shadow-md ${scrolled && !darkMode ? "text-slate-800" : "text-white"}`} size={20} />
              <button className={`
                px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all hover:shadow-orange-500/25 transform hover:-translate-y-0.5
                ${darkMode || !scrolled ? "bg-white text-slate-900 hover:bg-orange-50" : "bg-slate-900 text-white hover:bg-slate-800"}
              `}>
                Sign In
              </button>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleTheme} className={scrolled && !darkMode ? "text-slate-800" : "text-white"}>
               {darkMode ? <Sun size={20} className="drop-shadow-md"/> : <Moon size={20} className="drop-shadow-md" />}
             </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={scrolled && !darkMode ? "text-slate-900" : "text-white"}>
              {mobileMenuOpen ? <X /> : <Menu className="drop-shadow-md" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden absolute top-full left-0 right-0 ${darkMode ? "bg-slate-950" : "bg-white"} border-t border-slate-100/10`}
            >
              <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
                {["Home", "Portfolio", "Comics", "About"].map((item, i) => (
                  <motion.a 
                    key={item} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href="#" 
                    className={`text-2xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

const Hero = ({ darkMode }: { darkMode: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 200]); 

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000); 
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-black">
      
      {/* Background Layer */}
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
          />
          
          {/* Subtle overall overlay to tone down super bright images */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Weather & Particles */}
      <WeatherSystem type={slide.weather} />

      {/* --- THE NEW ANIMATED CLOUD DECK --- */}
      {/* This sits above the image but below the text content */}
      <CloudDeck darkMode={darkMode} />

      {/* Main Content */}
      <motion.div 
        style={{ y: yParallax }}
        className="relative z-20 w-11/12 mx-auto h-full flex items-center pb-20" // Added padding bottom to sit nicely above clouds
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
            
            {/* Tag */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
              <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border backdrop-blur-xl shadow-lg ${
                darkMode ? "border-white/10 text-white bg-white/5" : "border-white/40 text-white bg-white/10"
              }`}>
                <Sparkles size={12} className={slide.accent} /> {slide.subtitle}
              </span>
            </motion.div>

            {/* Title */}
            <div className="mb-8 relative">
              <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tight text-white drop-shadow-2xl`}>
                {slide.title.split(" ").map((word, i) => (
                  <motion.span 
                    key={i} 
                    className="inline-block mr-3"
                    initial={{ opacity: 0, y: 60, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.1 + (i * 0.1),
                      type: "spring", bounce: 0.3
                    }}
                  >
                    <span className={i > 0 && i % 3 === 0 ? `text-transparent bg-clip-text bg-gradient-to-r ${slide.buttonGradient} brightness-125` : ""}>{word}</span>
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-2xl font-medium leading-relaxed max-w-xl mb-12 text-slate-100 drop-shadow-lg"
            >
              {slide.description}
            </motion.p>

            {/* Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-5">
              
              {/* PRIMARY HERO BUTTON - Wet Zigzag Effect */}
              <button className={`
                relative group px-10 py-5 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-1
                bg-gradient-to-r ${slide.buttonGradient} ${slide.buttonShadow} shadow-2xl ring-1 ring-white/30
              `}>
                <span className="relative z-30 flex items-center gap-2 drop-shadow-md">
                  Start Reading <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Zigzag Moisture Effect */}
                <div className="absolute inset-0 z-20 w-[200%] h-full -translate-x-[120%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out skew-x-12">
                   <div 
                      className="w-24 h-full bg-white/50 backdrop-blur-lg mix-blend-overlay"
                      style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
                   />
                </div>
                 <div className="absolute inset-0 z-20 w-[200%] h-full -translate-x-[120%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out delay-100 skew-x-12">
                   <div className="ml-28 w-3 h-full bg-white/60 blur-[3px] mix-blend-overlay" />
                </div>
              </button>
              
              <button className={`
                flex items-center gap-3 px-8 py-5 rounded-full font-bold text-lg transition-all border-2 backdrop-blur-xl group shadow-lg
                border-white/20 text-white hover:bg-white/10 hover:border-white/40
              `}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-black transition-transform group-hover:scale-110">
                  <Play size={14} fill="currentColor" />
                </div>
                <span>Watch Trailer</span>
              </button>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Indicators */}
      <div className="absolute right-0 top-0 bottom-0 w-24 hidden md:flex flex-col justify-center items-center z-30">
        <div className="space-y-6">
          {SLIDES.map((s, index) => (
            <div key={s.id} className="relative group cursor-pointer" onClick={() => setCurrentSlide(index)}>
              <div className={`w-1 transition-all duration-500 rounded-full backdrop-blur-md ${
                currentSlide === index 
                  ? `h-16 bg-gradient-to-b ${s.buttonGradient}` 
                  : "h-2 bg-white/30 group-hover:h-6 group-hover:bg-white/60"
              }`} />
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
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen font-sans selection:bg-orange-500 selection:text-white transition-colors duration-700 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"}`}>
      <Navbar darkMode={darkMode} toggleTheme={() => setDarkMode(!darkMode)} />
      
      <main>
        <Hero darkMode={darkMode} />
        
        {/* Content Section */}
        <section className="relative z-10 py-24 bg-inherit">
          <div className="w-11/12 mx-auto">
             <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-4xl font-bold mb-2">New Arrivals</h2>
                  <p className="opacity-70">Fresh from the studio</p>
                </div>
                <button className="text-orange-500 font-bold hover:tracking-wide transition-all flex items-center gap-1">View All Collections <ChevronRight size={16}/></button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1,2,3,4].map(i => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-xl ${darkMode ? "bg-slate-900/50" : "bg-slate-100"}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10 opacity-90 transition-opacity group-hover:opacity-100" />
                    <img 
                      src={`https://source.unsplash.com/random/400x600?anime,fantasy,art&sig=${i}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt="Cover"
                    />
                    <div className="absolute bottom-6 left-6 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                       <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-2 drop-shadow-md">Episode {i}</span>
                       <h3 className="text-xl font-bold text-white leading-tight drop-shadow-lg">The Lost Chapter: Volume {i}</h3>
                    </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}