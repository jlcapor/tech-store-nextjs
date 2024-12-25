import type { ColumnSort, Row } from "@tanstack/react-table"
import { type filterSchema } from "@/lib/parsers"
import { type z } from "zod"
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
	id: string,
	name: string
	url: string
}

export type Prettify<T> = {
	[K in keyof T]: T[K]
} & {}

export type StringKeyOf<TData> = Extract<keyof TData, string>

export interface Option {
	label: string
	value: string
	icon?: React.ComponentType<{ className?: string }>
	count?: number
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, "id"> {
	id: StringKeyOf<TData>
}
  
export type ExtendedSortingState<TData> = ExtendedColumnSort<TData>[]

export type ColumnType = DataTableConfig["columnTypes"][number]

export interface DataTableFilterField<TData> {
	id: StringKeyOf<TData>
	label: string
	placeholder?: string
	options?: Option[]
}

export interface DataTableAdvancedFilterField<TData>
  extends DataTableFilterField<TData> {
  type: ColumnType
}


export type Filter<TData> = Prettify<
  Omit<z.infer<typeof filterSchema>, "id"> & {
    id: StringKeyOf<TData>
  }
>

export interface DataTableRowAction<TData> {
	row: Row<TData>
	type: "update" | "delete"
}
