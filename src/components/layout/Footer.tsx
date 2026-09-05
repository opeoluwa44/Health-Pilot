import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">HealthPilot</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your AI-powered health assistant. Get reliable health information,
              track your wellness, and make informed decisions about your
              health.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@healthpilot.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1-800-HEALTH</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-assistant"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link
                  to="/symptom-checker"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link
                  to="/tracker"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Health Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Health Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Nutrition Guides
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exercise Tips
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Wellness Education
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>© 2024 HealthPilot. All rights reserved.</p>
          <p className="mt-2">
            This platform provides general health information only and is not a
            substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
