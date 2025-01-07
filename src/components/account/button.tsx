'use client';

import Link from 'next/link';

import { BookOpen, ChevronsUpDown, HelpCircle, Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/hooks/use-user';
import { Button } from '../ui/button';
import { shortenTextFunction } from '@/utils/shortenText';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export const AccountButton = () => {
  const { isLoading, user, logout } = useUser();
  const { resolvedTheme } = useTheme();

  const privyUser = user?.privyUser;

  const isMobile = useIsMobile();

  const label = privyUser?.wallet
    ? privyUser.wallet.address.substring(0, 5)
    : privyUser?.email?.address;
  const subLabel = privyUser?.id?.substring(10);
  const twitter = privyUser?.twitter;
  const twitterUsername = twitter?.username;
  const twitterProfileImage = twitter?.profilePictureUrl;

  return (
    <>
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading || !privyUser ? (
              <Button
                // variant="outline"
                size="lg"
                className="bg-background hover:!bg-none"
              >
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="grid flex-1 gap-1 text-left text-sm leading-tight">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="ml-auto size-4" />
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                className="bg-background"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={twitterProfileImage || undefined} />
                  <AvatarFallback className="rounded-lg">
                    {label?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {twitterUsername ? `@${twitterUsername}` : shortenTextFunction(label || '', 10)}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {shortenTextFunction(subLabel || '', 5)}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </Button>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg z-[99999999]"
            // side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {/* Follow us on X */}
              <DropdownMenuItem
                onClick={() => window.open('https://x.com/vity-toolkit', '_blank')}
              >
                <div className="mr-2 h-4 w-4">
                  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill={resolvedTheme === 'dark' ? 'white' : 'black'}><title>X</title><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                </div>
                Follow us on X
              </DropdownMenuItem>

              {/* Docs */}
              <DropdownMenuItem
                onClick={() => window.open('https://vity-toolkit.gitbook.io/', '_blank')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Docs
              </DropdownMenuItem>

              {/* Account */}
              <Link href="/dashboard">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    </>
  );
};
