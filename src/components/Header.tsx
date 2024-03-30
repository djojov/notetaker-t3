import { Github, Mail } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ModeToggle } from "./ui/theme-toggle";

function Header() {
  const { data: sessionData } = useSession();

  return (
    <div className="sticky top-0 border-b border-border/40 p-4 backdrop-blur">
      <div className="container flex flex-row items-center justify-between">
        <a href="#" className="text-xl font-bold text-primary">
          Notetaker T3
        </a>
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
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sessionData?.user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {sessionData?.user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => void signOut()}
                  className="cursor-pointer text-red-600"
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
