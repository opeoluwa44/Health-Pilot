import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Search } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const COMMON_SYMPTOMS = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Nausea",
  "Dizziness",
  "Chest pain",
  "Shortness of breath",
  "Sore throat",
  "Body aches",
];

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
  };

  const handleCheck = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setResult(
      `Based on the symptoms you've selected (${selectedSymptoms.join(", ")}), here are some general insights:\n\n` +
        "**Possible causes** may include common conditions, but this is not a diagnosis.\n\n" +
        "**Suggested next steps:**\n" +
        "1. Monitor your symptoms\n" +
        "2. Rest and stay hydrated\n" +
        "3. Consult a healthcare professional if symptoms persist\n\n" +
        "**Disclaimer:** This tool provides general information only and is not a medical diagnosis. Please consult a doctor for proper evaluation.",
    );
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Symptom Checker</h1>
        <p className="text-gray-600">
          Select your symptoms to get educational information.
        </p>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Select Symptoms
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {COMMON_SYMPTOMS.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isSelected
                    ? "bg-primary-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {symptom}
              </button>
            );
          })}
        </div>

        <Input
          label="Additional Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your symptoms in more detail..."
          className="mb-4"
        />

        <Button
          onClick={handleCheck}
          loading={loading}
          disabled={selectedSymptoms.length === 0}
          className="w-full sm:w-auto"
        >
          <Search className="h-4 w-4 mr-2" />
          Check Symptoms
        </Button>
      </Card>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-blue-50 border-blue-200">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">Results</h3>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-line">
                  {result}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
