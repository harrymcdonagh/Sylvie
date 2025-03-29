import type { Message, User } from "@/lib/types";
import { Cat } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface MessageBubbleProps {
  message: Message;
  user: User;
}

const MessageBubble = ({ message, user }: MessageBubbleProps) => {
  const isUserMessage = message.sender === "user";

  return (
    <div className={`flex ${isUserMessage ? "justify-end" : "justify-start"} mb-2`}>
      {!isUserMessage && (
        <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center mr-2 self-end">
          <Cat className="text-orange-400 w-8 h-8" />
        </div>
      )}

      <div className="flex flex-col max-w-[80%]">
        <div
          className={`p-3 rounded-lg ${
            isUserMessage
              ? "bg-primary text-primary-foreground rounded-br-none"
              : "bg-muted text-muted-foreground rounded-bl-none border border-border"
          }`}
        >
          {message.content}
        </div>
      </div>
      {isUserMessage && <Avatar className="text-orange-400 w-8 h-8" />}
    </div>
  );
};

export default MessageBubble;
