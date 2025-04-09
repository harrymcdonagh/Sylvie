"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  name: string;
  email: string;
  image?: string;
  onSignOut: () => void;
};

const UserDropdown = ({ name, email, image, onSignOut }: Props) => {
  const router = useRouter();
  const avatarFallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full">
        <div className="group flex items-center gap-2 p-1 rounded-full transition-all duration-200 ease-out transform hover:scale-[1.03] cursor-pointer">
          {name && (
            <span className="text-sm font-medium hidden md:inline-block text-white group-hover:text-orange-400 transition-colors duration-200">
              {name}
            </span>
          )}
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={image || undefined} alt={name || "User avatar"} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3 py-1">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarImage src={image || undefined} alt={name || "User avatar"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-base font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground mt-1">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/profile")} className="py-2">
            <User className="mr-2 h-5 w-5" />
            <span className="text-base">Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")} className="py-2">
            <Settings className="mr-2 h-5 w-5" />
            <span className="text-base">Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onSignOut}
          className="text-destructive focus:text-destructive py-2"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span className="text-base">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
