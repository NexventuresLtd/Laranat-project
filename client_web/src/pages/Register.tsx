// RegisterPage.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Eye, EyeOff, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RegisterPageProps {
  darkMode: boolean;
}

export default function RegisterPage({ darkMode }: RegisterPageProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (formData.fullName.trim().length < 2)
      newErrors.fullName = "Full name must be at least 2 characters";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.phone && !/^[\+]?[0-9\-\s\(\)]+$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);

    // Simulated API call
    setTimeout(() => {
      console.log("Registration attempt with:", {
        fullName: formData.fullName,
        email: formData.email,
        password: "***",
        phone: formData.phone || "Not provided",
      });
      setIsLoading(false);

      // Redirect to login
      navigate("/signin");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className={`rounded-2xl p-8 ${darkMode ? "bg-slate-900/50" : "bg-white shadow-xl"}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
            Full Name *
          </label>
          <div className="relative">
            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`} size={20} />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-gray-50 border-gray-300 text-slate-900 placeholder:text-slate-400"
              } ${errors.fullName ? "border-red-500" : ""}`}
            />
          </div>
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Email Address *</label>
          <div className="relative">
            <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`} size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-gray-50 border-gray-300 text-slate-900 placeholder:text-slate-400"
              } ${errors.email ? "border-red-500" : ""}`}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Password *</label>
          <div className="relative">
            <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`} size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`w-full pl-11 pr-12 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-gray-50 border-gray-300 text-slate-900 placeholder:text-slate-400"
              } ${errors.password ? "border-red-500" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className={darkMode ? "text-slate-500" : "text-slate-400"} size={20} /> : <Eye className={darkMode ? "text-slate-500" : "text-slate-400"} size={20} />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>Phone Number (Optional)</label>
          <div className="relative">
            <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-slate-500" : "text-slate-400"}`} size={20} />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (234) 567-8900"
              className={`w-full pl-11 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  : "bg-gray-50 border-gray-300 text-slate-900 placeholder:text-slate-400"
              } ${errors.phone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
          className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            darkMode
              ? "bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-500/50"
              : "bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-500/50"
          }`}
        >
          {isLoading ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Create Account
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}
