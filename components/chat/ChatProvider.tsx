"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Message } from "@/lib/types";

interface ChatContextType {
  activeConversation: string;
  setActiveConversation: (id: string) => void;
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  refreshMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [activeConversation, setActiveConversation] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const refreshMessages = async () => {
    if (!activeConversation) return;
    try {
      const res = await fetch(`/api/messages?conversationId=${activeConversation}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  useEffect(() => {
    refreshMessages();
  }, [activeConversation]);

  return (
    <ChatContext.Provider
      value={{
        activeConversation,
        setActiveConversation,
        messages,
        setMessages,
        refreshMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
