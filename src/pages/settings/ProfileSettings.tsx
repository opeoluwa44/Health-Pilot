import { useState } from "react";
import { User, Bell, Shield, Moon, Sun } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useAuthStore, useUIStore } from "../../store";

export default function ProfileSettings() {
  const { user, updateProfile } = useAuthStore();
  const { theme, setTheme } = useUIStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateProfile({ name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Profile Information */}
      <Card>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-primary-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Profile Information
            </h2>
            <p className="text-sm text-gray-600">
              Update your personal details
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Button onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <Bell className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            <p className="text-sm text-gray-600">
              Manage your notification preferences
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">
                Receive health tips and updates via email
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-primary-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Security</h2>
            <p className="text-sm text-gray-600">
              Manage your password and security settings
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Input label="Current Password" type="password" />
          <Input label="New Password" type="password" />
          <Input label="Confirm New Password" type="password" />
          <Button>Update Password</Button>
        </div>
      </Card>

      {/* Theme */}
      <Card>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            {theme === "dark" ? (
              <Moon className="h-6 w-6 text-purple-700" />
            ) : (
              <Sun className="h-6 w-6 text-purple-700" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Appearance</h2>
            <p className="text-sm text-gray-600">
              Customize how HealthPilot looks
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === "light"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Sun className="h-6 w-6 mx-auto mb-2 text-gray-700" />
            <p className="text-sm font-medium text-gray-900">Light</p>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
              theme === "dark"
                ? "border-primary-500 bg-primary-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Moon className="h-6 w-6 mx-auto mb-2 text-gray-700" />
            <p className="text-sm font-medium text-gray-900">Dark</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
