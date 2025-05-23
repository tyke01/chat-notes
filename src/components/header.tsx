import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./dark-mode-toggle";
import LogOutButton from "./logout-button";

const Header = () => {
  const user = 1; // Replace with actual user data
  return (
    <header
      className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link href="/" className="flex items-end gap-2">
        <Image src="/logo.png" alt="logo" height={40} width={40} priority />
        <h1 className="mb-1 flex flex-col text-2xl font-bold leading-6">
          Chat
          <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant={"outline"}>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
