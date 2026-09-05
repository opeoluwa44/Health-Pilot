import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Heart,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  MessageSquare,
  Activity,
  BookOpen,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore, useUIStore } from "../../store";

const navLinks = [
  { path: "/dashboard", label: "Dashboard", icon: Activity },
  { path: "/ai-assistant", label: "AI Assistant", icon: MessageSquare },
  { path: "/symptom-checker", label: "Symptom Checker", icon: Stethoscope },
  { path: "/tracker", label: "Health Tracker", icon: Activity },
  { path: "/resources", label: "Resources", icon: BookOpen },
  { path: "/settings", label: "Settings", icon: Settings },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { toggleSidebar } = useUIStore();

  const isLandingPage = location.pathname === "/";

  if (isLandingPage) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                HealthPilot
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/#features"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Features
              </Link>
              <Link
                to="/#benefits"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Benefits
              </Link>
              <Link
                to="/#faq"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                FAQ
              </Link>
              <Link
                to="/signin"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/#features"
                className="block text-gray-600 hover:text-primary-600"
              >
                Features
              </Link>
              <Link
                to="/#benefits"
                className="block text-gray-600 hover:text-primary-600"
              >
                Benefits
              </Link>
              <Link
                to="/#faq"
                className="block text-gray-600 hover:text-primary-600"
              >
                FAQ
              </Link>
              <Link
                to="/signin"
                className="block text-gray-600 hover:text-primary-600"
              >
                Sign In
              </Link>
              <Link to="/signup" className="block btn-primary text-center">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">
                HealthPilot
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-700" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user?.name || "User"}
                </span>
              </button>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1"
                >
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
