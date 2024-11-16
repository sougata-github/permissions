import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="w-full flex h-14 px-4 py-10 border-b">
      <nav className="w-full max-w-6xl flex items-center justify-between mx-auto">
        {/* Logo */}
        <div className="flex gap-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Permissions</h1>
        </div>

        {/* Clerk Stuff */}
        <div>
          <ClerkLoading>
            <div className="p-4 flex items-center justify-center">
              <Loader className="size-4 text-black animate-spin transition-all" />
            </div>
          </ClerkLoading>

          <ClerkLoaded>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
            {/* Log in buttons */}

            <SignedOut>
              <Link href="/sign-in">
                <Button>Sign in</Button>
              </Link>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </nav>
    </header>
  );
};

export default Header;
