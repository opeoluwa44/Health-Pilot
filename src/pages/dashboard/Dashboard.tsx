import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Stethoscope,
  BarChart3,
  BookOpen,
  Heart,
  Activity,
  Droplets,
  Moon,
  Dumbbell,
  Calendar,
  Bell,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import MetricCard from "../../components/dashboard/MetricCard";
import { useHealthStore, useChatStore, useAuthStore } from "../../store";
import { formatDate } from "../../utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const { user } = useAuthStore();
  const { conversations } = useChatStore();
  const { metrics, wellnessScore } = useHealthStore();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  }, []);

  const recentConversations = conversations.slice(0, 3);
  const recentMetrics = metrics.slice(0, 5);

  const stats = [
    {
      title: "Wellness Score",
      value: wellnessScore?.overall || 85,
      change: 5,
      changeLabel: "vs last week",
      icon: Heart,
      iconColor: "text-red-500",
      iconBgColor: "bg-red-50",
    },
    {
      title: "AI Conversations",
      value: conversations.length,
      change: 12,
      changeLabel: "this month",
      icon: MessageSquare,
      iconColor: "text-primary-600",
      iconBgColor: "bg-primary-50",
    },
    {
      title: "Health Metrics",
      value: metrics.length,
      change: 8,
      changeLabel: "tracked",
      icon: Activity,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50",
    },
    {
      title: "Days Active",
      value: 12,
      change: 3,
      changeLabel: "this month",
      icon: Calendar,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50",
    },
  ];

  const quickActions = [
    {
      path: "/ai-assistant",
      label: "Ask AI Assistant",
      icon: MessageSquare,
      color: "bg-primary-100 text-primary-700",
    },
    {
      path: "/symptom-checker",
      label: "Check Symptoms",
      icon: Stethoscope,
      color: "bg-teal-100 text-teal-700",
    },
    {
      path: "/tracker",
      label: "Log Health Data",
      icon: BarChart3,
      color: "bg-green-100 text-green-700",
    },
    {
      path: "/resources",
      label: "Browse Resources",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div variants={item} initial="hidden" animate="show">
        <h1 className="text-2xl font-bold text-gray-900">
          {greeting}, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">Here's your health overview for today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={item}>
            <MetricCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} initial="hidden" animate="show">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.path}>
                <Card hover className="h-full">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {action.label}
                  </h3>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent AI Conversations */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent AI Conversations
              </h2>
              <Link to="/ai-assistant">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            {recentConversations.length > 0 ? (
              <div className="space-y-3">
                {recentConversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    to="/ai-assistant"
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conversation.messages.length} messages •{" "}
                      {formatDate(conversation.updatedAt)}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600 mb-3">No conversations yet</p>
                <Link to="/ai-assistant">
                  <Button size="sm">Start Your First Chat</Button>
                </Link>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Upcoming Reminders */}
        <motion.div variants={item} initial="hidden" animate="show">
          <Card>
            <div className="flex items-center mb-4">
              <Bell className="h-5 w-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Reminders</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                <Droplets className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Drink Water
                  </p>
                  <p className="text-xs text-gray-600">Every 2 hours</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-green-50 rounded-lg">
                <Dumbbell className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Exercise</p>
                  <p className="text-xs text-gray-600">30 min daily</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                <Moon className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Sleep Schedule
                  </p>
                  <p className="text-xs text-gray-600">10 PM - 6 AM</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Health Metrics */}
      <motion.div variants={item} initial="hidden" animate="show">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Health Metrics
            </h2>
            <Link to="/tracker">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          {recentMetrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Value</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentMetrics.map((metric) => (
                    <tr key={metric.id} className="text-sm">
                      <td className="py-3 text-gray-900 capitalize">
                        {metric.type.replace("_", " ")}
                      </td>
                      <td className="py-3 text-gray-600">
                        {typeof metric.value === "number"
                          ? `${metric.value} ${metric.unit}`
                          : `${metric.value.systolic}/${metric.value.diastolic} ${metric.unit}`}
                      </td>
                      <td className="py-3 text-gray-500">
                        {formatDate(metric.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-3">No metrics tracked yet</p>
              <Link to="/tracker">
                <Button size="sm">Start Tracking</Button>
              </Link>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
