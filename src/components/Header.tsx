import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

function Header() {
  const { data: sessionData } = useSession();

  return (
    <div className="border-border/40 sticky top-0 border-b p-4 backdrop-blur">
      <div className="container flex flex-row items-center justify-between">
        <div className="text-xl font-bold text-zinc-50">
          {sessionData?.user?.name
            ? `Notes for ${sessionData.user.name}`
            : "Notetaker T3"}
        </div>
        {sessionData?.user ? (
          <Avatar
            onClick={() => void signOut()}
            className="cursor-pointer rounded-full"
          >
            <AvatarImage src={sessionData?.user?.image ?? ""} />
            <AvatarFallback>{sessionData?.user?.name?.[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <Button onClick={() => void signIn()}>
            <Mail className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
