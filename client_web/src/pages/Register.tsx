import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import type { RegisterFormData } from "../Types/index";

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={20} height={20} aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

interface RegisterPageProps {
  darkMode: boolean;
}

const initialFormData: RegisterFormData = {
  fullName: "",
  email: "",
  password: "",
  phone: "",
};

export default function RegisterPage({ darkMode }: RegisterPageProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    return newErrors;
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration success:", data);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    handleRegister(formData);
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  return (
    <div className={`min-h-screen flex font-sans ${darkMode ? "bg-slate-950 text-white" : "bg-white text-slate-900"}`}>
      {/* LEFT – Background (scrolls with page) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden min-h-screen">
        <img
          src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-600/90 via-slate-900/40 to-transparent" />
        <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center text-white p-12">
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-white text-orange-600 rounded-xl flex items-center justify-center font-black text-2xl shadow-xl">
              L
            </div>
            <span className="text-3xl font-black tracking-tighter">Lanart21</span>
          </div>
          <div className="max-w-md w-full flex flex-col items-center text-center">
            <h1 className="text-6xl xl:text-7xl font-black mb-6 leading-[0.9] tracking-tighter">
              Empowering <br /> Digital <br /> Stories.
            </h1>
            <p className="text-orange-100 text-lg xl:text-xl font-medium">
              The creative studio for artists and innovators.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT – Form (scrolls with page, reduced space) */}
      <div className={`w-full lg:w-1/2 flex flex-col min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <div className="p-5 lg:p-6 shrink-0">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500">
            <ChevronLeft size={16} /> Back to Home
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6 lg:px-10 xl:px-14 py-5">
          <div className="max-w-md w-full mx-auto space-y-4">
            <div className="flex flex-col items-center text-center mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-lg flex items-center justify-center font-black text-xl shadow-lg">
                  L
                </div>
                <span className={`text-xl font-black tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}>
                  Lanart21
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs">
                Start your journey by filling in your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Full Name *"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                icon={<User size={20} />}
                placeholder="John Doe"
                darkMode={darkMode}
                error={errors.fullName}
              />

              <InputField
                label="Email Address *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={<Mail size={20} />}
                placeholder="you@example.com"
                darkMode={darkMode}
                error={errors.email}
              />

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">Password *</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border transition-all outline-none text-sm ${
                      errors.password
                        ? "border-red-500"
                        : darkMode
                          ? "bg-slate-800 border-slate-700 focus:border-orange-500"
                          : "bg-white border-slate-200 focus:border-orange-500"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-xs font-semibold text-red-500 mt-1">{errors.password}</p>}
              </div>

              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                icon={<Phone size={20} />}
                placeholder="+250 788 000 000"
                type="tel"
                darkMode={darkMode}
                error={errors.phone}
              />

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/25 text-sm"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Create Account <ChevronRight size={18} /></>
                )}
              </motion.button>
            </form>

            <div className="relative flex items-center gap-3">
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs font-medium text-slate-500">Or continue with</span>
              <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            <motion.button
              type="button"
              onClick={handleGoogleSignUp}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
                darkMode ? "border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white" : "border-slate-200 bg-white hover:bg-slate-50 text-slate-800"
              }`}
            >
              <GoogleIcon />
              Sign in with Google
            </motion.button>

            <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
  placeholder?: string;
  type?: string;
  darkMode: boolean;
  error?: string;
}

function InputField({
  label,
  name,
  value,
  onChange,
  icon,
  placeholder,
  type = "text",
  darkMode,
  error,
}: InputFieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
          {icon}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full pl-10 py-3 rounded-xl border outline-none transition-all text-sm ${
            error
              ? "border-red-500"
              : darkMode
                ? "bg-slate-800 border-slate-700 focus:border-orange-500"
                : "bg-white border-slate-200 focus:border-orange-500"
          }`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-500 mt-1">{error}</p>}
    </div>
  );
}
