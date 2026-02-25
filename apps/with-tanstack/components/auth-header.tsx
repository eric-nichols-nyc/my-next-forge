"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthHeader() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="h-9 w-20 animate-pulse rounded bg-muted" />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-sm">
          {session.user.name ?? session.user.email}
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" size="sm" asChild>
      <Link href="/sign-in">
        <LogIn className="mr-2 h-4 w-4" />
        Sign in
      </Link>
    </Button>
  );
}
