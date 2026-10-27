import { describe, expect, it } from 'vitest'
import type { Product } from '../types/product'
import {
  filterProductsByTitle,
  groupProductsByCategory,
  sortProductsByRating,
} from './productHelpers'

function makeProduct(overrides: Partial<Product> & Pick<Product, 'id'>): Product {
  return {
    title: 'Sample',
    price: 10,
    description: 'Desc',
    category: 'electronics',
    image: 'https://example.com/img.png',
    rating: { rate: 3, count: 10 },
    ...overrides,
  }
}

describe('productHelpers', () => {
  it('sorts products by rating descending', () => {
    const products = [
      makeProduct({ id: 1, rating: { rate: 3.2, count: 1 } }),
      makeProduct({ id: 2, rating: { rate: 4.8, count: 1 } }),
      makeProduct({ id: 3, rating: { rate: 4.1, count: 1 } }),
    ]

    const sorted = sortProductsByRating(products)
    expect(sorted.map((p) => p.id)).toEqual([2, 3, 1])
  })

  it('groups products by category and sorts each group', () => {
    const products = [
      makeProduct({
        id: 1,
        category: 'electronics',
        rating: { rate: 2, count: 1 },
      }),
      makeProduct({
        id: 2,
        category: 'electronics',
        rating: { rate: 5, count: 1 },
      }),
      makeProduct({
        id: 3,
        category: "men's clothing",
        rating: { rate: 4, count: 1 },
      }),
    ]

    const grouped = groupProductsByCategory(products)
    expect(grouped.get('electronics')?.map((p) => p.id)).toEqual([2, 1])
    expect(grouped.get("men's clothing")?.map((p) => p.id)).toEqual([3])
  })

  it('filters products by title case-insensitively', () => {
    const products = [
      makeProduct({ id: 1, title: 'Fjallraven Backpack' }),
      makeProduct({ id: 2, title: 'Gold Ring' }),
    ]

    expect(filterProductsByTitle(products, 'backpack')).toHaveLength(1)
    expect(filterProductsByTitle(products, '  ')).toHaveLength(2)
  })
})
