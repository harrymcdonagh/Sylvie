"use client";

import { motion } from "framer-motion";
import type { Message, User } from "@/lib/types";
import { Cat } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  user: User;
}

const MessageBubble = ({ message, user }: MessageBubbleProps) => {
  const isUserMessage = message.sender === "user";
  const avatarFallback = user.name?.charAt(0).toUpperCase();

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
          className={`p-4 rounded-lg leading-relaxed ${
            isUserMessage
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-primary text-primary-foreground rounded-bl-none border border-border"
          }`}
        >
          {message.content}
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
