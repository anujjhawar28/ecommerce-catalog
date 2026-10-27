import type { Product } from '../types/product'
import { CATEGORY_ORDER } from '../types/product'

export function sortProductsByRating(products: Product[]): Product[] {
  return [...products].sort((a, b) => b.rating.rate - a.rating.rate)
}

export function groupProductsByCategory(
  products: Product[],
): Map<string, Product[]> {
  const grouped = new Map<string, Product[]>()

  for (const category of CATEGORY_ORDER) {
    grouped.set(category, [])
  }

  for (const product of products) {
    const list = grouped.get(product.category)
    if (list) {
      list.push(product)
    } else {
      grouped.set(product.category, [product])
    }
  }

  for (const [category, list] of grouped) {
    grouped.set(category, sortProductsByRating(list))
  }

  return grouped
}

export function filterProductsByTitle(
  products: Product[],
  query: string,
): Product[] {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return products
  return products.filter((product) =>
    product.title.toLowerCase().includes(normalized),
  )
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
