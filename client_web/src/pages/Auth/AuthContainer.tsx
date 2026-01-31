import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginPage from "../Login";
import RegisterPage from "../Register";

export default function AuthContainer({ darkMode }: { darkMode: boolean }) {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);

  // ✅ Updated to use /login instead of /signin
  useEffect(() => {
    setIsLogin(location.pathname === "/login");
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? "bg-slate-950" : "bg-gray-50"}`}>
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <Link to="/" className="mb-6 inline-block text-sm text-orange-500 hover:underline">
          ← Back to Home
        </Link>

        {/* Render Login or Register */}
        {isLogin ? <LoginPage darkMode={darkMode} /> : <RegisterPage darkMode={darkMode} />}

        {/* Toggle link */}
        <p className="mt-6 text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link to={isLogin ? "/register" : "/login"} className="text-orange-500 font-semibold">
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
}
