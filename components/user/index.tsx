"use client";

import * as React from "react";
import { SignOutButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";

interface Props {
  user: User;
}

export default function ({ user }: Props) {
  const router = useRouter();
  const { fetchUserInfo } = useContext(AppContext);
  return (
    <div>
      {/* {user.credits && (
        <div className="hidden md:block mr-8 font-medium cursor-pointer">
          credits:{" "}
          <span className="text-primary">
            {user.credits.left_credits}
          </span>
        </div>
      )} */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar_url} alt={user.nickname} />
            <AvatarFallback>{user.nickname}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mx-4 z-100">
          <DropdownMenuLabel className="text-center truncate">
            {user.nickname ? user.nickname : user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem className="hover:!bg-white">
            <div className="!text-red-500 font-bold ">
              <SignOutButton
                signOutCallback={async () => {
                  router.push("/");
                  fetchUserInfo();
                }}
              />
            </div>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
