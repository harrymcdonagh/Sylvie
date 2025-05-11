"use client";

import { useRef, useEffect, useState } from "react";
import ChatTitle from "./ChatTitle";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import type { Message, User } from "@/lib/types";
import { useChatContext } from "./ChatProvider";
import { useUser } from "@/hooks/useUser";
import BarLoader from "../ui/BarLoader";

const assistant: User = {
  id: "assistant",
  name: "Sylvie",
};

export const Chat = () => {
  const { activeConversation, messages, setMessages } = useChatContext();
  const [isTyping, setIsTyping] = useState(false);
  const { user, loading, error } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser: User = {
    id: user?.id || "",
    name: user?.name || "User",
    avatar: user?.image || "",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500">
        {error}
      </div>
    );
  }

  if (loading) {
    return <BarLoader />;
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || !activeConversation) return;

    const userMessage: Message = {
      _id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      status: "sent",
    };
    //@ts-ignore
    setMessages((prev) => [...prev, userMessage]);

    const { _id, ...uMessage } = userMessage;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...uMessage, conversationId: activeConversation }),
    });

    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          userId: user?.id,
          conversationId: activeConversation,
        }),
      });
      const data = await response.json();

      const assistantMessage: Message = {
        _id: (Date.now() + 1).toString(),
        content: data.reply,
        sender: "assistant",
        timestamp: new Date().toISOString(),
        status: "sent",
      };
      //@ts-ignore
      setMessages((prev) => [...prev, assistantMessage]);

      const { _id: aId, ...aMessage } = assistantMessage;
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...aMessage, conversationId: activeConversation }),
      });
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage: Message = {
        _id: (Date.now() + 1).toString(),
        content: "Oops, something went wrong.",
        sender: "assistant",
        timestamp: new Date().toISOString(),
        status: "sent",
      };
      //@ts-ignore
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-gray-500">
        Start a conversation now
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full flex-1 max-w-5xl mx-auto rounded-xl shadow-lg overflow-hidden border text-foreground">
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
