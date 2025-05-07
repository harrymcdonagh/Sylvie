"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Cat, Plus } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const SKELETON_WIDTHS = {
  conversations: ["70%", "65%", "75%", "68%", "72%"],
  footerItems: ["60%", "65%", "55%"],
};

export function ChatSidebarSkeleton() {
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
            className="w-full gap-2 bg-orange-500 hover:bg-orange-600 text-white cursor-not-allowed opacity-70"
            size="sm"
            disabled
          >
            <Plus size={16} />
            <span>New Chat</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 my-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span>Recent Conversations</span>
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col space-y-1 px-2">
              {SKELETON_WIDTHS.conversations.map((width, index) => (
                <SidebarMenuItem key={index}>
                  <div className="flex h-8 items-center gap-2 px-2 py-5 rounded-md">
                    <Skeleton className="size-4 rounded-md" />
                    <div className="flex flex-col gap-1 flex-1">
                      <Skeleton className="h-4 rounded-md" style={{ width }} />
                      <Skeleton className="h-3 rounded-md" style={{ width: "40%" }} />
                    </div>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-5 w-32 rounded-md" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SKELETON_WIDTHS.footerItems.map((width, index) => (
                <SidebarMenuItem key={index}>
                  <div className="flex h-8 items-center gap-2 px-2 rounded-md">
                    <Skeleton className="size-4 rounded-md" />
                    <Skeleton className="h-4 rounded-md" style={{ width }} />
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

export default ChatSidebarSkeleton;
