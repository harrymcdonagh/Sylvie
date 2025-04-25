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
import {
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  User,
  Cat,
  Trash,
  ChevronDown,
} from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useChatContext } from "./ChatProvider";
import type { Conversation } from "@/lib/types";
import { Input } from "../ui/input";

export function ChatSidebar() {
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const { activeConversation, setActiveConversation, setActiveConversationData } =
    useChatContext();
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
          setActiveConversationData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [session, activeConversation, setActiveConversation, setActiveConversationData]);

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

  const handleNewChat = async () => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch(`/api/conversations/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!res.ok) {
        throw new Error("Failed to create new conversation");
      }

      const newConversation = await res.json();
      setConversations((prev) => [newConversation, ...prev]);
      setActiveConversation(newConversation._id);
      setActiveConversationData(newConversation);
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      const res = await fetch(
        `/api/conversations/remove?conversationId=${conversationId}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        throw new Error("Failed to delete conversation");
      }
      setConversations((prev) => prev.filter((conv) => conv._id !== conversationId));
      if (activeConversation === conversationId) {
        if (conversations.length > 1) {
          const remaining = conversations.filter((conv) => conv._id !== conversationId);
          setActiveConversation(remaining[0]?._id || "");
          setActiveConversationData(remaining[0] || null);
        } else {
          setActiveConversation("");
          setActiveConversationData(null);
        }
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="pb-2">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Link href="/">
                <Cat className="text-orange-400 w-10 h-10" />
              </Link>
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
            onClick={handleNewChat}
          >
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            onClick={() => setCollapsed(!collapsed)}
            className="
      flex items-center justify-between
      px-4 py-2
      text-sm font-medium text-gray-700 dark:text-gray-300
      hover:bg-gray-100 dark:hover:bg-neutral-800
      rounded-md
      cursor-pointer select-none
      transition-colors
      my-2
    "
          >
            <div className="flex items-center gap-2">
              <span>Recent Conversations</span>
              <ChevronDown
                className={`
          w-4 h-4 transform transition-transform duration-200
          ${collapsed ? "rotate-180" : ""}
        `}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {conversations.length}
            </span>
          </SidebarGroupLabel>
          {!collapsed && (
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col space-y-1 px-2">
                {conversations.map((conv) => {
                  const isActive = activeConversation === conv._id;
                  return (
                    <SidebarMenuItem key={conv._id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        onClick={() => {
                          setActiveConversation(conv._id);
                          setActiveConversationData(conv);
                        }}
                        className={`
                        w-full
                        px-4
                        py-5          
                        rounded-md
                        cursor-pointer
                        transition-colors duration-150
                        ${
                          isActive
                            ? "bg-orange-500 text-white"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                        }
                      `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <MessageSquare
                              size={16}
                              className="text-gray-500 dark:text-gray-400"
                            />
                            <div className="flex flex-col">
                              <span
                                className={isActive ? "font-semibold" : "font-normal"}
                              >
                                {conv.title}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatDate(conv.createdAt)}
                              </span>
                            </div>
                          </div>
                          <Trash
                            size={16}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteConversation(conv._id);
                            }}
                            className="text-gray-400 hover:text-red-500"
                          />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          )}
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
