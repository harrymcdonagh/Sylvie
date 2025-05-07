export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  course?: string;
  year?: string;
  createdAt?: string;
}

export interface Message {
  _id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: string;
  status: "sent" | "delivered" | "read";
}

export interface Conversation {
  _id: string;
  title: string;
  createdAt: string;
  unread?: boolean;
}
