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
    <ScrollArea className="flex-1 min-h-0 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            user={message.sender === "user" ? currentUser : assistant}
          />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Cat className="text-orange-400 w-8 h-8" />
            <div className="bg-muted p-3 rounded-lg flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm">Typing...</span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatWindow;
