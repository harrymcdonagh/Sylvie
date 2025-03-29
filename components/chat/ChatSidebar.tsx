"use client";

import { useState } from "react";
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

const conversations = [
  { id: 1, title: "Welcome Chat", date: new Date(2023, 5, 15), unread: false },
  { id: 2, title: "Timetable Help", date: new Date(2023, 5, 18), unread: true },
  { id: 3, title: "Wellbeing Advice", date: new Date(2023, 5, 10), unread: false },
];

const sortedConversations = [...conversations].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
);

export function ChatSidebar() {
  const [activeConversation, setActiveConversation] = useState(sortedConversations[0].id);

  // Format date to relative time (today, yesterday, or date)
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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
            <span className="text-xs text-muted-foreground">
              {sortedConversations.length}
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sortedConversations.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeConversation === conversation.id}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <a href="#" className="flex items-center gap-2 relative">
                      <MessageSquare size={16} />
                      <div className="flex flex-col">
                        <span>{conversation.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(conversation.date)}
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
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2">
                    <User size={16} />
                    <span>My Account</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
