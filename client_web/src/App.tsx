import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./comps/sharedComp/Navbar";
import Footer from "./comps/sharedComp/Footer";
import Hero from "./pages/Hero";
import FeaturedComics from "./comps/homePage/FeaturedComics";
import NewReadings from "./comps/homePage/NewReadings";
import OurServices from "./comps/homePage/OurServices";
import HomeCTA from "./comps/homePage/HomeCTA";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import About from "./pages/about";
import Comics from "./pages/Comics";
import Bookstore from "./pages/Bookstore";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const { darkMode, toggleTheme } = useDarkMode();
  const location = useLocation();

  // Scroll to Featured Comics when navigating to /#featured-comics
  useEffect(() => {
    const hash = location.hash || window.location.hash;
    if (location.pathname === "/" && hash === "#featured-comics") {
      const el = document.getElementById("featured-comics");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-700 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* Navbar only on non-auth pages */}
      {!isAuthPage && <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />}

      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            <>
              <Hero darkMode={darkMode} />
              <FeaturedComics darkMode={darkMode} />
              <NewReadings darkMode={darkMode} />
              <OurServices darkMode={darkMode} />
              <HomeCTA darkMode={darkMode} />
            </>
          }
        />

        {/* ABOUT */}
        <Route path="/about" element={<About darkMode={darkMode} />} />

        {/* COMICS – all comics page (View All goes here) */}
        <Route path="/comics" element={<Comics darkMode={darkMode} />} />

        {/* BOOKSTORE – filter by category */}
        <Route path="/bookstore" element={<Bookstore darkMode={darkMode} />} />

        {/* AUTH PAGES – two separate pages */}
        <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
        <Route path="/register" element={<RegisterPage darkMode={darkMode} />} />
      </Routes>

      {/* Footer only on non-auth pages */}
      {!isAuthPage && <Footer darkMode={darkMode} />}
    </div>
  );
}
