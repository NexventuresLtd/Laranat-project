import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/* Use logo from project (replace file in public/Image/ with the one from Drive folder if needed) */
const LANART_LOGO_URL = '/Image/Larnat_logo.jpg';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Portfolio', to: '/portfolio' },
  { name: 'Our Services', to: '/services' },
  { name: 'Books', to: '/books' },
  { name: 'About Us', to: '/about' },
  { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  const useLightText = isTransparent;

  return (
    <nav
      className="sticky top-0 z-50 w-full font-noteworthy transition-all duration-300"
      style={{
        fontFamily: 'var(--font-noteworthy)',
        backgroundColor: isTransparent ? 'transparent' : scrolled && isHome ? 'rgba(255,255,255,0.85)' : 'var(--navbar-bg)',
        backdropFilter: isTransparent ? 'none' : (scrolled && isHome) ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isTransparent ? 'none' : (scrolled && isHome) ? 'blur(12px)' : 'none',
        boxShadow: !isTransparent && (scrolled || !isHome) ? 'var(--navbar-shadow)' : 'none',
        borderBottom: isTransparent ? '1px solid transparent' : '1px solid var(--navbar-border)',
      }}
    >
      <div className="w-[91.666667%] mx-auto">
        <div className="flex justify-between items-center min-h-[5rem] lg:min-h-[6rem] py-2">
          {/* Logo only – no text */}
          <Link
            to="/"
            className="flex items-center shrink-0 no-underline"
            aria-label="Lanart21 Creative Studio – Home"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 shadow-sm bg-white"
              style={{ borderColor: isTransparent ? 'rgba(255,255,255,0.4)' : 'var(--navbar-border)' }}
            >
              <img
                src={LANART_LOGO_URL}
                alt="Lanart21"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="nav-link px-4 py-2.5 rounded-lg text-base xl:text-lg font-semibold transition-all duration-300 relative group"
                style={{
                  color: useLightText ? 'rgba(255,255,255,0.95)' : 'var(--navbar-text)',
                }}
              >
                <span className="relative z-10 group-hover:text-[var(--navbar-text-hover)] transition-colors duration-300">
                  {link.name}
                </span>
                <span
                  className="absolute bottom-1 left-4 right-4 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                  style={{ backgroundColor: 'var(--navbar-text-hover)' }}
                />
              </Link>
            ))}
          </div>

          {/* Right: Join Now + mobile menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-bold uppercase tracking-wider text-white transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: 'var(--navbar-cta-bg)' }}
            >
              Join Us
            </Link>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary-blue)] transition-colors"
              style={{ color: useLightText ? 'white' : 'var(--navbar-text)' }}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className="lg:hidden border-t overflow-hidden"
          style={{
            borderColor: 'var(--navbar-border)',
            backgroundColor: 'var(--navbar-bg)',
            boxShadow: 'inset 0 4px 6px -2px rgba(0,0,0,0.05)',
          }}
        >
          <div className="w-[91.666667%] mx-auto py-4 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="block py-3.5 px-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:pl-6"
                style={{ color: 'var(--navbar-text)' }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t" style={{ borderColor: 'var(--navbar-border)' }}>
              <Link
                to="/login"
                className="flex items-center justify-center w-full py-4 rounded-xl text-base font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: 'var(--navbar-cta-bg)' }}
                onClick={() => setIsOpen(false)}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
