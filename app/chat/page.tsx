import { Chat } from "@/components/chat/Chat";
import { ChatProvider } from "@/components/chat/ChatProvider";

export default function Dashboard() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-neutral-900">
      <Chat />
    </main>
  );
}
