"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-full"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-orange-500 hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 text-white"
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;
