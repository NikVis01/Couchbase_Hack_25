"use client";

import * as React from "react";
import { IconFolder } from "@tabler/icons-react";
import { Target } from "lucide-react";

import {
  NavApps,
  NavMain,
  // NavSecondary,
  NavUser,
  NavCreditsOverview,
} from "@/components/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useGetAppSessionsByUserId } from "@/hooks/api/dashboard/use-app-session";
import { data } from "./constants";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: appSessions } = useGetAppSessionsByUserId();

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <Link href='/dashboard'>
                <Target className='!size-5 text-primary' />
                <span className='text-base font-semibold'>SmartPyLogger</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavApps
          items={
            appSessions?.map((appSession) => ({
              id: appSession.id,
              name: appSession.name || "New App Session",
              url: `/dashboard/app/${appSession.id}`,
              icon: IconFolder,
            })) || []
          }
        />

        <NavCreditsOverview />
        {/* 
        <NavSecondary items={data.navSecondary} className='mt-auto' /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
