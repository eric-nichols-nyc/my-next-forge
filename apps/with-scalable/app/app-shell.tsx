"use client";

import { DashboardLayout } from "@repo/design-system/components/layout";
import { SidebarTrigger } from "@repo/design-system/components/ui/sidebar";
import { AppSidebar } from "./sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      header={
        <>
          <SidebarTrigger />
          <span className="text-muted-foreground text-sm">Scalable App</span>
        </>
      }
      sidebar={<AppSidebar />}
    >
      {children}
    </DashboardLayout>
  );
}
