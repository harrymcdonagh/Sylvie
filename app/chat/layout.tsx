import { ChatProvider } from "@/components/chat/ChatProvider";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import SessionWrapper from "@/components/providers/SessionWrapper";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionWrapper>
        <ChatProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <ChatSidebar />
              <SidebarInset className="flex flex-col flex-1 overflow-hidden">
                {children}
              </SidebarInset>
            </div>
          </SidebarProvider>
        </ChatProvider>
      </SessionWrapper>
    </>
  );
}
