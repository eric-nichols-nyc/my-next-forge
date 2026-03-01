"use client";

import { SidebarProvider, SidebarTrigger } from "@repo/design-system/components/ui/sidebar";
import { AppSidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="fixed inset-y-0 left-0 z-20 hidden w-64 md:block">
        <AppSidebar />
      </div>
      <div className="flex min-h-screen flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <span className="text-muted-foreground text-sm">
            Next.js Optimization Lab
          </span>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
