"use client";

import { motion } from "framer-motion";
import type { Message, User } from "@/lib/types";
import { Cat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: Message;
  user: User;
}

const MessageBubble = ({ message, user }: MessageBubbleProps) => {
  const isUserMessage = message.sender === "user";
  const avatarFallback = user.name?.charAt(0).toUpperCase();

  const normalizeMarkdown = (text: string) => {
    return text
      .replace(/(\d\.\s[^\n]+)\n\n(?=\d\.)/g, "$1\n") // remove blank lines between numbered list items
      .replace(/\n{3,}/g, "\n\n") // no more than 2 line breaks
      .trim();
  };
  const cleanedContent = normalizeMarkdown(message.content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      {!isUserMessage && (
        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-2 self-end">
          <Cat className="text-orange-400 w-8 h-8" />
        </div>
      )}
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`p-4 rounded-lg leading-relaxed whitespace-pre-line ${
            isUserMessage
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-primary text-primary-foreground rounded-bl-none border border-border"
          }`}
        >
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="my-1">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              a: ({ node, ...props }) => (
                <a
                  {...props}
                  className="text-blue-600 underline hover:text-blue-800 dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1">{children}</ul>
              ),
              li: ({ children }) => <li>{children}</li>,
            }}
          >
            {cleanedContent}
          </ReactMarkdown>
        </div>
      </div>
      {isUserMessage && (
        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center ml-2 self-end">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatar} alt={user.name || "User avatar"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
