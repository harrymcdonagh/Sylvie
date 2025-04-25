// components/chat/ChatWindow.tsx
"use client";

import React, { Fragment } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message, User } from "@/lib/types";
import MessageBubble from "./MessageBubble";
import { Loader2, Cat } from "lucide-react";

interface ChatWindowProps {
  messages: Message[];
  currentUser: User;
  assistant: User;
  isTyping: boolean;
}

const ChatWindow = ({ messages, currentUser, assistant, isTyping }: ChatWindowProps) => {
  return (
    <ScrollArea className="flex-1 min-h-0 p-4 pb-24">
      <div className="flex flex-col space-y-4">
        {messages.map((message, idx) => {
          const msgDate = new Date(message.timestamp).toDateString();
          const prevDate =
            idx > 0 ? new Date(messages[idx - 1].timestamp).toDateString() : null;

          return (
            <Fragment key={message._id}>
              {(idx === 0 || msgDate !== prevDate) && (
                <div className="flex justify-center my-4">
                  <span className="px-3 py-1 text-xs text-muted-foreground bg-muted rounded-full">
                    {new Date(message.timestamp).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              <MessageBubble
                message={message}
                user={message.sender === "user" ? currentUser : assistant}
              />
            </Fragment>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cat className="text-orange-400 w-8 h-8" />
            <div className="flex items-center gap-1">
              {[0, 200, 400].map((delay, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatWindow;
