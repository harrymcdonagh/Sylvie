"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Cat } from "lucide-react";

// Sample messages for demonstration
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! I'm Sylvie, your UEA assistant. How can I help you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 2,
    role: "user",
    content: "Hi Sylvie! Can you tell me about my timetable for tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: 3,
    role: "assistant",
    content:
      "I'd be happy to help with your timetable! Let me check that for you...\n\nFor tomorrow, you have:\n\n- 9:00 AM: Computer Science Lecture (Room 1.02)\n- 11:00 AM: Mathematics Tutorial (Room 2.14)\n- 2:00 PM: Programming Lab (IT Lab 3)\n\nWould you like me to remind you about these sessions tomorrow morning?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
  // Add more messages to demonstrate scrolling
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: i + 4,
    role: i % 2 === 0 ? "user" : ("assistant" as "user" | "assistant"),
    content:
      i % 2 === 0
        ? `This is test message ${i + 1} from the user to demonstrate scrolling.`
        : `This is test message ${i + 1} from the assistant to demonstrate scrolling.`,
    timestamp: new Date(Date.now() - 1000 * 60 * (2 - i * 0.1)),
  })),
];

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate assistant typing
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const newAssistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: "I'm processing your request. I'll get back to you shortly.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  // Handle Enter key to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Current Conversation</h2>
      </div>

      {/* Messages area - using a native scrollable div instead of ScrollArea */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {message.role === "assistant" ? (
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Cat className="h-5 w-5 text-orange-500" />
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-sm font-medium">You</span>
                  </div>
                </div>
              )}

              <div>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-[80%]">
              <div className="flex-shrink-0 mt-1">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Cat className="h-5 w-5 text-orange-500" />
                </div>
              </div>
              <div className="rounded-lg p-3 bg-muted">
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area - fixed at the bottom */}
      <div className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>

          <div className="relative flex-1">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[50px] resize-none pr-12"
              rows={1}
            />
            <Button
              size="icon"
              className="absolute right-2 bottom-2"
              onClick={handleSendMessage}
              disabled={input.trim() === ""}
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="icon" className="flex-shrink-0">
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for a new line
        </div>
      </div>
    </div>
  );
}
