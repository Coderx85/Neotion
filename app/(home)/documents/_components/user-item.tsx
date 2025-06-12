import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { CgChevronDoubleUpR } from 'react-icons/cg';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';

const UserItem = () => {
  const { user } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md"
        >
          <div className="flex items-center gap-x-2 max-w-[170px]">
            <Avatar className="size-5 bg-gray-200 dark:bg-gray-800">
              <AvatarImage
                src={user?.imageUrl}
                alt="User Avatar"
                className="rounded-full object-cover "
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-start text-sm font-medium line-clamp-1">
              {user?.fullName}&apos;s Neotion
            </span>
            <CgChevronDoubleUpR className="size-6 text-muted-foreground data-[disabled]:rotate-180" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        // className="w-48"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center gap-x-2">
            <div className="rounded-md bg-gray-100 dark:bg-gray-700 p-2">
              <Avatar className="size-5">
                <AvatarImage src={user?.imageUrl} alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {user?.fullName}&apos;s Neotion
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer w-full text-muted-foreground"
          asChild
        >
          <Button>Log Out</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserItem;
