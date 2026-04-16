import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

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
  const { settings } = useSiteContent();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTransparent = isHome && !scrolled;
  const useLightText = isTransparent;
  const isActiveLink = (to: string) => (to === '/' ? location.pathname === '/' : location.pathname.startsWith(to));

  return (
    <nav
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        fontFamily: 'var(--font-body)',
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
            <img
              src={settings.logoLandscapeUrl || settings.logoUrl || '/Image/lanart.jpg'}
              alt={settings.siteName || 'Lanart21'}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Center: Nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="nav-link px-4 py-2.5 rounded-lg text-base xl:text-lg font-semibold transition-all duration-300 relative group"
                style={{
                  color: isActiveLink(link.to)
                    ? 'white'
                    : useLightText
                      ? 'rgba(255,255,255,0.95)'
                      : 'var(--navbar-text)',
                  backgroundColor: isActiveLink(link.to) ? 'var(--color-primary-blue)' : 'transparent',
                }}
              >
                <span className="relative z-10 transition-colors duration-300">
                  {link.name}
                </span>
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 transition-transform duration-300 origin-left rounded-full ${
                    isActiveLink(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  style={{ backgroundColor: isActiveLink(link.to) ? 'white' : 'var(--navbar-text-hover)' }}
                />
              </Link>
            ))}
          </div>

          {/* Right: mobile menu toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
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
                style={{
                  color: isActiveLink(link.to) ? 'white' : 'var(--navbar-text)',
                  backgroundColor: isActiveLink(link.to) ? 'var(--color-primary-blue)' : 'transparent',
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
