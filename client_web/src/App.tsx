import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./comps/sharedComp/Navbar";
import Footer from "./comps/sharedComp/Footer";
import Hero from "./pages/Hero";
import NewArrivals from "./comps/homePage/NewArrivals";
import AuthContainer from "./pages/Auth/AuthContainer";
import { useDarkMode } from "./hooks/useDarkMode";

export default function App() {
  const { darkMode, toggleTheme } = useDarkMode();
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

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
              <NewArrivals darkMode={darkMode} />
            </>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/signin" element={<AuthContainer darkMode={darkMode} />} />
        <Route path="/signup" element={<AuthContainer darkMode={darkMode} />} />
      </Routes>

      {/* Footer only on non-auth pages */}
      {!isAuthPage && <Footer darkMode={darkMode} />}
    </div>
  );
}
