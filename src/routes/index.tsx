import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import AIAssistant from "../pages/ai-assistant/AIAssistant";
import SymptomChecker from "../pages/symptom-checker/SymptomChecker";
import HealthTracker from "../pages/tracker/HealthTracker";
import HealthResources from "../pages/resources/HealthResources";
import ProfileSettings from "../pages/settings/ProfileSettings";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "ai-assistant",
    element: (
      <ProtectedRoute>
        <AIAssistant />
      </ProtectedRoute>
    ),
  },
  {
    path: "symptom-checker",
    element: (
      <ProtectedRoute>
        <SymptomChecker />
      </ProtectedRoute>
    ),
  },
  {
    path: "tracker",
    element: (
      <ProtectedRoute>
        <HealthTracker />
      </ProtectedRoute>
    ),
  },
  {
    path: "resources",
    element: (
      <ProtectedRoute>
        <HealthResources />
      </ProtectedRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute>
        <ProfileSettings />
      </ProtectedRoute>
    ),
  },
]);
