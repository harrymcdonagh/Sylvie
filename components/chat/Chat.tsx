"use client";

import { useState, useRef, useEffect } from "react";
import ChatTitle from "./ChatTitle";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import type { Message, User } from "@/lib/types";
import { useSession } from "next-auth/react";

export const Chat = () => {
  const { data: session } = useSession();
  console.log(session?.user.id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser: User = {
    id: session?.user.id || "",
    name: session?.user.name || "User",
    avatar: session?.user.image || "",
  };

  const assistant: User = {
    id: "assistant",
    name: "Sylvie",
  };

  useEffect(() => {
    if (!currentUser.id) return;
    const fetchConversation = async () => {
      const res = await fetch(`/api/conversations?userId=${currentUser.id}`);
      if (res.ok) {
        const conv = await res.json();
        setConversationId(conv._id);
      }
    };
    fetchConversation();
  }, [currentUser.id]);

  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages?conversationId=${conversationId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    };
    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !conversationId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ ...userMessage, conversationId }),
    });

    setIsTyping(true);

    setTimeout(async () => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm responding to your message: "${content}"`,
        sender: "assistant",
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message with conversationId
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ ...assistantMessage, conversationId }),
      });

      setIsTyping(false);
    }, 1500);
  };

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
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Chat;
