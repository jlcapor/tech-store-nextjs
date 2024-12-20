import { type SidebarNavItem } from "@/types"

export interface DashboardConfig {
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
    sidebarNav: [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: 'dashboard',
            items: [],
        },
        {
            title: 'productos',
            href: '/dashboard/products',
            icon: 'cube',
            items: [],
        }
    ]
}