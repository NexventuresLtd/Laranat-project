import React from 'react';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  variant: 'portfolio' | 'services' | 'about' | 'contact';
}

/* Books & comics themed hero images */
const VARIANT_STYLES = {
  portfolio: {
    image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=1920&q=80',
    overlay: 'linear-gradient(120deg, rgba(103, 51, 176, 0.88) 0%, rgba(13, 71, 161, 0.85) 50%, rgba(3, 169, 244, 0.75) 100%)',
    pattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 50%)',
  },
  services: {
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80',
    overlay: 'linear-gradient(135deg, rgba(3, 169, 244, 0.9) 0%, rgba(13, 71, 161, 0.92) 100%)',
    pattern: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
  },
  about: {
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1920&q=80',
    overlay: 'linear-gradient(145deg, rgba(13, 71, 161, 0.88) 0%, rgba(238, 64, 168, 0.35) 100%)',
    pattern: 'radial-gradient(ellipse 80% 50% at 70% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)',
  },
  contact: {
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=1920&q=80',
    overlay: 'linear-gradient(160deg, rgba(13, 71, 161, 0.9) 0%, rgba(3, 169, 244, 0.85) 50%, rgba(103, 51, 176, 0.7) 100%)',
    pattern: 'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.04) 50%, transparent 52%)',
  },
};

const PageHero: React.FC<PageHeroProps> = ({ eyebrow, title, subtitle, variant }) => {
  const style = VARIANT_STYLES[variant];

  return (
    <section
      className="relative min-h-[42vh] -mt-[6.5rem] pt-[6.5rem] pb-20 md:pb-28 overflow-hidden flex items-center"
      aria-label={`${title} page header`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={style.image}
          alt=""
          className="w-full h-full object-cover scale-105"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{ background: style.overlay }}
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{ backgroundImage: style.pattern }}
          aria-hidden
        />
      </div>

      <div className="relative w-[91.666667%] mx-auto text-center max-w-4xl">
        <motion.p
          className="text-white/90 text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-sm"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default PageHero;
