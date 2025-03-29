export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}
