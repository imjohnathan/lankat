import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignIn, SignOut } from "@/components/user/signInOut";
import { auth } from "@/lib/auth";

export async function UserNav({ className }: { className?: string }) {
  const session = await auth();
  const nameShort = session?.user?.name?.charAt(0) ?? "?";
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              {session ? (
                <>
                  <AvatarImage
                    src={session.user.image ?? ""}
                    alt={session.user.name ?? ""}
                  />
                  <AvatarFallback>{nameShort}</AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarFallback>?</AvatarFallback>
                </>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[1001] w-56" align="end" forceMount>
          {session && (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {session?.user.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session?.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem>
            {session ? (
              <SignOut className="w-full">
                <button className="w-full text-left">登出</button>
              </SignOut>
            ) : (
              <SignIn provider="google" className="w-full">
                <button className="w-full text-left">使用 Google 登入</button>
              </SignIn>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
