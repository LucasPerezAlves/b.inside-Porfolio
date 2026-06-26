import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Prefixa caminhos de imagens com BASE_URL para funcionar tanto em dev (/
// quanto em GitHub Pages (/b.inside-Porfolio/). Vite resolve em build time.
export function imgUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
