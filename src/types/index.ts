import { type Icons } from "@/components/icons"
import { DataTableConfig } from "@/config/data-table"

export interface NavItem {
	title: string
	href?: string
	isActive?: boolean
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
	label?: string
	description?: string
}

export interface NavItemWithChildren extends NavItem {
	items?: NavItemWithChildren[]
}

export interface FooterItem {
	title: string
	items: {
	  title: string
	  href: string
	  external?: boolean
	}[]
  }
  
export type MainNavItem = NavItemWithChildren
  
export type SidebarNavItem = NavItemWithChildren

export interface SearchParams {
	[key: string]: string | string[] | undefined
}

export interface ProductFile {
	id: string
	name: string
	url: string
}





  






