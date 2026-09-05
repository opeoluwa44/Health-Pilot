import { motion } from "framer-motion";
import {
  Heart,
  MessageSquare,
  Stethoscope,
  BarChart3,
  BookOpen,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const features = [
  {
    icon: MessageSquare,
    title: "AI Health Assistant",
    description:
      "Get instant answers to your health questions with our advanced AI assistant.",
  },
  {
    icon: Stethoscope,
    title: "Symptom Checker",
    description: "Understand your symptoms and get guidance on next steps.",
  },
  {
    icon: BarChart3,
    title: "Health Tracking",
    description:
      "Monitor your wellness metrics with beautiful charts and insights.",
  },
  {
    icon: BookOpen,
    title: "Health Resources",
    description: "Access reliable medical information and wellness guides.",
  },
];

const benefits = [
  "24/7 access to health information",
  "Personalized wellness insights",
  "Track multiple health metrics",
  "Secure and private",
  "Evidence-based information",
  "Easy-to-use interface",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Fitness Enthusiast",
    content:
      "HealthPilot has transformed how I track my wellness. The AI assistant is incredibly helpful!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Busy Professional",
    content:
      "Finally, a health app that understands my needs. The symptom checker gave me peace of mind.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Health Coach",
    content:
      "I recommend HealthPilot to all my clients. It's comprehensive and easy to use.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Is HealthPilot a substitute for a doctor?",
    answer:
      "No, HealthPilot provides general health information and is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a healthcare professional for medical concerns.",
  },
  {
    question: "Is my health data secure?",
    answer:
      "Yes, we take data security seriously. All your health information is encrypted and stored securely. We never share your personal data with third parties.",
  },
  {
    question: "How accurate is the AI assistant?",
    answer:
      "Our AI assistant provides evidence-based health information, but it's not a medical professional. Always verify important health information with a qualified healthcare provider.",
  },
  {
    question: "Can I use HealthPilot for free?",
    answer:
      "Yes! HealthPilot offers a free tier with access to basic features. Premium plans are available for advanced features and personalized insights.",
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
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
              <a
                href="#features"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="text-gray-600 hover:text-primary-600 transition-colors"
              >
                FAQ
              </a>
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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              <a
                href="#features"
                className="block text-gray-600 hover:text-primary-600"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="block text-gray-600 hover:text-primary-600"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="block text-gray-600 hover:text-primary-600"
              >
                Testimonials
              </a>
              <a
                href="#faq"
                className="block text-gray-600 hover:text-primary-600"
              >
                FAQ
              </a>
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeIn}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
              >
                Your AI-Powered
                <span className="text-primary-600"> Health Assistant</span>
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Get instant answers to your health questions, track your
                wellness metrics, and access reliable medical information - all
                in one place.
              </motion.p>
              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/ai-assistant">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Try AI Assistant
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="mt-8 flex items-center space-x-6 text-sm text-gray-600"
              >
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-500 mr-2" />
                  <span>24/7 Available</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-teal-500 mr-2" />
                  <span>100k+ Users</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-teal-100 rounded-2xl p-8 shadow-2xl">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        AI Health Assistant
                      </p>
                      <p className="text-sm text-gray-500">Online now</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                      What could cause frequent headaches?
                    </div>
                    <div className="bg-primary-50 rounded-lg p-3 text-sm text-gray-700">
                      Headaches can be caused by various factors including
                      stress, dehydration, lack of sleep, or eye strain. Let me
                      help you understand more...
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              Powerful Features for Your Health
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Everything you need to take control of your health and wellness
              journey.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={fadeIn}>
                  <Card hover className="h-full">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeIn}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
              >
                Why Choose HealthPilot?
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="text-lg text-gray-600 mb-8"
              >
                We're committed to providing you with the best health management
                tools powered by cutting-edge AI technology.
              </motion.p>
              <motion.div variants={staggerContainer} className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn}
                    className="flex items-start"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-teal-100 to-primary-100 rounded-2xl p-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Your Wellness Score
                  </h3>
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg className="w-32 h-32 transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                          fill="none"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="#0ea5e9"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - 0.85)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">
                          85
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-gray-600">
                    Excellent wellness score!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl text-gray-600">
              Join thousands of satisfied users who trust HealthPilot.
            </motion.p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card className="h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeIn}>
                <Card>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Ready to Take Control of Your Health?
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
            >
              Join HealthPilot today and start your journey to better health
              with AI-powered insights.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Link to="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
