import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Github, Mail } from "lucide-react";
import { ModeToggle } from "./ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils";
import Link from "next/link";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

function Header() {
  const { data: sessionData } = useSession();

  return (
    <div className="border-border/40 sticky top-0 border-b p-4 backdrop-blur">
      <div className="container flex flex-row items-center justify-between">
        <div className="text-xl font-bold text-primary">Notetaker T3</div>
        <div className="flex gap-x-4">
          {sessionData?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer rounded-full">
                  <AvatarImage src={sessionData?.user?.image ?? ""} />
                  <AvatarFallback>
                    {sessionData?.user?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel
                  className={cn(
                    "font-sans font-normal antialiased",
                    fontSans.variable,
                  )}
                >
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sessionData?.user?.name}
                    </p>
                    <p className="text-muted-foreground text-xs leading-none">
                      {sessionData?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void signOut()}
                  className={cn(
                    "cursor-pointer font-sans text-red-600 antialiased",
                    fontSans.variable,
                  )}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => void signIn()}>
              <Mail className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
          )}
          <Button variant="outline" size="icon">
            <Link
              href={"https://github.com/djojov/notetaker-t3"}
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
