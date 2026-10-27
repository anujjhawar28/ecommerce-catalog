export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

export const CATEGORY_ORDER = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const

export type CatalogCategory = (typeof CATEGORY_ORDER)[number]

export function categoryLabel(category: string): string {
  if (category === 'jewelery') return 'Jewelry'
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
