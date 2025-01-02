import { ReadonlyURLSearchParams } from "next/navigation"
import { env } from "@/env"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}


export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};


export function formatPrice(
  price: number | string,
  opts: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: opts.currency ?? "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    notation: opts.notation ?? "standard", // Usa el formato completo
    ...opts,
  }).format(Number(price));
}




export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("es-ES", {
    day: opts.day ?? "2-digit",  // Para asegurarse de que el día tenga dos dígitos
    month: opts.month ?? "2-digit",  // Para el mes con dos dígitos
    year: opts.year ?? "numeric",  // El año como número
    ...opts,
  }).format(new Date(date))
}


export function isMacOs() {
  if (typeof window === "undefined") return false

  return window.navigator.userAgent.includes("Mac")
}

export function toSentenceCase(str: string) {
  return str
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace(/\s+/g, " ")
    .trim()
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate"
      ? (accurateSizes[i] ?? "Bytest")
      : (sizes[i] ?? "Bytes")
  }`
}