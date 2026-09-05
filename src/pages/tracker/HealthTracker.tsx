import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Plus, TrendingUp, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useHealthStore } from "../../store";
import { formatDate } from "../../utils";
import type { HealthMetric } from "../../types";

const METRIC_TYPES = [
  { key: "weight", label: "Weight", unit: "kg", icon: Activity },
  {
    key: "blood_pressure",
    label: "Blood Pressure",
    unit: "mmHg",
    icon: Activity,
  },
  { key: "heart_rate", label: "Heart Rate", unit: "bpm", icon: Activity },
  { key: "blood_sugar", label: "Blood Sugar", unit: "mg/dL", icon: Activity },
  { key: "sleep", label: "Sleep", unit: "hours", icon: Activity },
  { key: "water", label: "Water Intake", unit: "glasses", icon: Activity },
  { key: "exercise", label: "Exercise", unit: "minutes", icon: Activity },
];

export default function HealthTracker() {
  const [selectedMetric, setSelectedMetric] = useState("weight");
  const [value, setValue] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { metrics, addMetric } = useHealthStore();

  const getMetricData = () => {
    return metrics
      .filter((m) => m.type === selectedMetric)
      .map((m) => ({
        date: formatDate(m.date),
        value: typeof m.value === "number" ? m.value : m.value.systolic,
      }))
      .reverse()
      .slice(-7);
  };

  const handleAdd = () => {
    if (!value) return;
    addMetric({
      type: selectedMetric as HealthMetric["type"],
      value: parseFloat(value),
      unit: METRIC_TYPES.find((m) => m.key === selectedMetric)?.unit || "",
      date: new Date().toISOString(),
    });
    setValue("");
    setShowAddForm(false);
  };

  const chartData = getMetricData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Tracker</h1>
          <p className="text-gray-600">Monitor your health metrics over time</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New Entry
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metric Type
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {METRIC_TYPES.map((metric) => (
                    <option key={metric.key} value={metric.key}>
                      {metric.label}
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={`Enter ${METRIC_TYPES.find((m) => m.key === selectedMetric)?.label}`}
              />
              <div className="flex items-end">
                <Button onClick={handleAdd} className="w-full">
                  Save Entry
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {METRIC_TYPES.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetric === metric.key;
          return (
            <button
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`p-4 rounded-lg text-center transition-colors ${
                isSelected
                  ? "bg-primary-50 border-2 border-primary-500"
                  : "bg-white border border-gray-200 hover:border-gray-300"
              }`}
            >
              <Icon
                className={`h-6 w-6 mx-auto mb-2 ${isSelected ? "text-primary-600" : "text-gray-400"}`}
              />
              <p className="text-sm font-medium text-gray-900">
                {metric.label}
              </p>
              <p className="text-xs text-gray-500">{metric.unit}</p>
            </button>
          );
        })}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {METRIC_TYPES.find((m) => m.key === selectedMetric)?.label} Trend
          </h3>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: "#0ea5e9", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              No data yet. Add your first entry to see trends.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
