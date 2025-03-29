"use client";

import { useState, useRef, useEffect } from "react";
import ChatTitle from "./ChatTitle";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import type { Message, User } from "@/lib/types";

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "assistant",
      timestamp: new Date(Date.now() - 60000 * 5).toISOString(),
      status: "read",
    },
    {
      id: "2",
      content: "What support services are available at UEA?",
      sender: "user",
      timestamp: new Date(Date.now() - 60000 * 3).toISOString(),
      status: "read",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser: User = {
    id: "user-1",
    name: "You",
    avatar: "/placeholder.svg?height=40&width=40",
  };

  const assistant: User = {
    id: "assistant-1",
    name: "Sylvie",
    avatar: "/placeholder.svg?height=40&width=40",
    isOnline: true,
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate assistant typing
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm responding to your message: "${content}"`,
        sender: "assistant",
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full w-[80%] rounded-xl shadow-lg overflow-hidden border bg-background text-foreground">
      <ChatTitle />
      <ChatWindow
        messages={messages}
        currentUser={currentUser}
        assistant={assistant}
        isTyping={isTyping}
      />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};
