import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../comps/Hero';
import About from '../comps/About';
import Services from '../comps/Services';
import Book from '../comps/Book';
import Team from '../comps/Team';
import Industries from '../comps/Industries';
import Contact from '../comps/Contact';
import Footer from '../comps/Footer';

const HomePage: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Book />
      <Team />
      <Industries />
      <Contact />
      <Footer />
    </>
  );
};

export default HomePage;
