import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search, Clock, User } from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const RESOURCES = [
  {
    id: "1",
    title: "10 Tips for Better Sleep",
    category: "wellness",
    author: "Dr. Sarah Johnson",
    readTime: "5 min read",
    content: "Improve your sleep quality with these evidence-based tips...",
  },
  {
    id: "2",
    title: "Understanding Nutrition Labels",
    category: "nutrition",
    author: "Nutritionist Mike Chen",
    readTime: "8 min read",
    content: "Learn how to read and understand nutrition labels...",
  },
  {
    id: "3",
    title: "Beginner's Guide to Exercise",
    category: "exercise",
    author: "Fitness Coach Emily",
    readTime: "10 min read",
    content: "Start your fitness journey with this comprehensive guide...",
  },
  {
    id: "4",
    title: "Stress Management Techniques",
    category: "wellness",
    author: "Dr. James Wilson",
    readTime: "6 min read",
    content: "Effective strategies for managing stress in daily life...",
  },
];

const CATEGORIES = [
  "all",
  "article",
  "tip",
  "nutrition",
  "exercise",
  "wellness",
];

export default function HealthResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredResources = RESOURCES.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Health Resources</h1>
        <p className="text-gray-600">
          Explore articles, tips, and guides for better health.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            icon={<Search className="h-5 w-5" />}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                  {resource.category}
                </span>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {resource.readTime}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {resource.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  {resource.author}
                </div>
                <Button variant="ghost" size="sm">
                  Read More
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">
            No resources found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
