import AboutHero from "../comps/aboutpage/AboutHero";
import AboutMissionVision from "../comps/aboutpage/AboutMissionVision";
import AboutUnique from "../comps/aboutpage/AboutUnique";
import AboutTeam from "../comps/aboutpage/AboutTeam";
import AboutTestimonials from "../comps/aboutpage/AboutTestimonials";
import AboutCTA from "../comps/aboutpage/AboutCTA";

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      <AboutHero darkMode={darkMode} />
      <AboutMissionVision darkMode={darkMode} />
      <AboutUnique darkMode={darkMode} />
      
      <AboutTeam darkMode={darkMode} />
      <AboutTestimonials darkMode={darkMode} />
      <AboutCTA darkMode={darkMode} />
    </div>
  );
}
