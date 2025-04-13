"use client";

import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, Plus, Settings, User, Cat } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useChatContext } from "./ChatProvider";
import type { Conversation } from "@/lib/types";

export function ChatSidebar() {
  const { data: session } = useSession();
  const { activeConversation, setActiveConversation } = useChatContext();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchConversations = async () => {
      try {
        const res = await fetch(`/api/conversations/recent?userId=${session.user.id}`);
        if (!res.ok) {
          throw new Error("Failed to load conversations");
        }
        const data = await res.json();
        setConversations(data);

        // If no active conversation is set, choose the first one.
        if (data.length > 0 && !activeConversation) {
          setActiveConversation(data[0]._id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [session, activeConversation, setActiveConversation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="pb-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Cat className="text-orange-400 w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Sylvie</h1>
              <p className="text-xs text-muted-foreground">UEA AI Assistant</p>
            </div>
          </div>
          <ModeToggle />
        </div>
        <div className="px-3 pt-2">
          <Button
            className="w-full gap-2 bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between">
            <span>Recent Conversations</span>
            <span className="text-xs text-muted-foreground">{conversations.length}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {conversations.map((conversation) => (
                <SidebarMenuItem key={conversation._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeConversation === conversation._id}
                    onClick={() => setActiveConversation(conversation._id)}
                  >
                    <a href="#" className="flex items-center gap-2 relative">
                      <MessageSquare size={16} />
                      <div className="flex flex-col">
                        <span>{conversation.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(conversation.createdAt)}
                        </span>
                      </div>
                      {conversation.unread && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-orange-500"></span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>{session?.user?.name}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User size={16} />
                    <span>My Account</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

export default ChatSidebar;
