import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  Copy,
  RefreshCw,
  User,
  Bot,
  AlertTriangle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useChatStore } from "../../store";
import { sendMessage } from "../../services/ai";
import { formatTime } from "../../utils";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

const SUGGESTED_PROMPTS = [
  "What could cause frequent headaches?",
  "How can I improve my sleep quality?",
  "What are common signs of dehydration?",
  "Explain high blood pressure.",
  "How much water should I drink daily?",
];

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    currentConversation,
    createConversation,
    addMessage,
    setIsTyping: setStoreTyping,
  } = useChatStore();

  useEffect(() => {
    if (!currentConversation) {
      createConversation();
    }
  }, [currentConversation, createConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentConversation?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !currentConversation) return;

    const userMessage = input.trim();
    setInput("");
    addMessage(currentConversation.id, { role: "user", content: userMessage });
    setIsTyping(true);
    setStoreTyping(true);

    try {
      const response = await sendMessage(userMessage);
      addMessage(currentConversation.id, {
        role: "assistant",
        content: response,
      });
    } catch {
      addMessage(currentConversation.id, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again.",
      });
    } finally {
      setIsTyping(false);
      setStoreTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const messages = currentConversation?.messages || [];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col ">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 mx-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            AI Health Assistant
          </h1>
          <p className="text-gray-600 text-sm">
            Ask any health-related question
          </p>
        </div>
        {messages.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              createConversation();
              setInput("");
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>

      {/* Disclaimer */}
      <Card className="mb-4 bg-yellow-50 border-yellow-200 mx-2">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">
              Medical Disclaimer
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              I am an AI assistant, not a licensed medical professional. This
              information is for educational purposes only and is not a
              substitute for professional medical advice, diagnosis, or
              treatment. Always seek the advice of your physician or other
              qualified health provider.
            </p>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Bot className="h-16 w-16 text-primary-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              How can I help you today?
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              I can answer general health questions, explain medical concepts,
              and provide wellness tips. What would you like to know?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePromptClick(prompt)}
                  className="text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <p className="text-sm text-gray-700">{prompt}</p>
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === "user"
                        ? "bg-primary-100 ml-3"
                        : "bg-teal-100 mr-3"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-primary-700" />
                    ) : (
                      <Bot className="h-4 w-4 text-teal-700" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === "user"
                        ? "bg-primary-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <div className="flex items-center mt-2 space-x-2">
                      <span
                        className={`text-xs ${
                          message.role === "user"
                            ? "text-primary-100"
                            : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                      {message.role === "assistant" && (
                        <button
                          onClick={() => copyToClipboard(message.content)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
                <Bot className="h-4 w-4 text-teal-700" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center space-x-2 mx-5">
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your health question..."
            className="w-full h-12 px-4 py-3 pr-12 text-gray-900 bg-white ring-1 ring-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 resize-none"
            rows={1}
            style={{ maxHeight: "120px" }}
          />
          <button
            type="button"
            className="absolute right-2 bottom-2 p-2 text-gray-400 hover:text-gray-600"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="mb-2 h-12"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
