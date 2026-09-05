import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  User,
  Conversation,
  HealthMetric,
  Reminder,
  WellnessScore,
  Message,
} from "../types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, _password: string) => {
        void _password;
        // Mock login - in production, this would call an API
        set({
          user: {
            id: "1",
            email,
            name: email.split("@")[0],
            createdAt: new Date().toISOString(),
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

interface ChatState {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isTyping: boolean;
  createConversation: () => Conversation;
  addMessage: (
    conversationId: string,
    message: Omit<Message, "id" | "timestamp">,
  ) => void;
  setCurrentConversation: (conversation: Conversation | null) => void;
  setIsTyping: (isTyping: boolean) => void;
  clearConversations: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  conversations: [],
  currentConversation: null,
  isTyping: false,
  createConversation: () => {
    const conversation: Conversation = {
      id: Date.now().toString(),
      title: "New Conversation",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({
      conversations: [conversation, ...state.conversations],
      currentConversation: conversation,
    }));
    return conversation;
  },
  addMessage: (
    conversationId: string,
    message: Omit<Message, "id" | "timestamp">,
  ) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              updatedAt: new Date().toISOString(),
              title:
                conv.messages.length === 0 && message.role === "user"
                  ? message.content.slice(0, 50) +
                    (message.content.length > 50 ? "..." : "")
                  : conv.title,
            }
          : conv,
      ),
      currentConversation:
        state.currentConversation?.id === conversationId
          ? {
              ...state.currentConversation,
              messages: [...state.currentConversation.messages, newMessage],
              updatedAt: new Date().toISOString(),
            }
          : state.currentConversation,
    }));
  },
  setCurrentConversation: (conversation) =>
    set({ currentConversation: conversation }),
  setIsTyping: (isTyping) => set({ isTyping }),
  clearConversations: () =>
    set({ conversations: [], currentConversation: null }),
}));

interface HealthState {
  metrics: HealthMetric[];
  reminders: Reminder[];
  wellnessScore: WellnessScore | null;
  addMetric: (metric: Omit<HealthMetric, "id">) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  toggleReminder: (id: string) => void;
  setWellnessScore: (score: WellnessScore) => void;
}

export const useHealthStore = create<HealthState>((set) => ({
  metrics: [],
  reminders: [],
  wellnessScore: null,
  addMetric: (metric) => {
    const newMetric: HealthMetric = { ...metric, id: Date.now().toString() };
    set((state) => ({ metrics: [newMetric, ...state.metrics] }));
  },
  addReminder: (reminder) => {
    const newReminder: Reminder = { ...reminder, id: Date.now().toString() };
    set((state) => ({ reminders: [...state.reminders, newReminder] }));
  },
  toggleReminder: (id) => {
    set((state) => ({
      reminders: state.reminders.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r,
      ),
    }));
  },
  setWellnessScore: (score) => set({ wellnessScore: score }),
}));

interface UIState {
  theme: "light" | "dark";
  sidebarOpen: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      sidebarOpen: false,
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: "ui-storage",
    },
  ),
);
