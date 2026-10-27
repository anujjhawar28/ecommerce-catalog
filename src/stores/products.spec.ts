import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Product } from '../types/product'
import { useProductsStore } from './products'

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Alpha Phone',
    price: 499,
    description: 'Phone',
    category: 'electronics',
    image: 'https://example.com/1.png',
    rating: { rate: 4.2, count: 100 },
  },
  {
    id: 2,
    title: 'Beta Phone',
    price: 399,
    description: 'Phone',
    category: 'electronics',
    rating: { rate: 4.9, count: 50 },
    image: 'https://example.com/2.png',
  },
  {
    id: 3,
    title: 'Silver Chain',
    price: 89,
    description: 'Jewelry',
    category: 'jewelery',
    image: 'https://example.com/3.png',
    rating: { rate: 3.5, count: 12 },
  },
]

describe('useProductsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('fetches products once and groups electronics by rating', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response)

    const store = useProductsStore()
    await store.loadProducts()
    await store.loadProducts()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(store.products).toHaveLength(3)
    expect(store.productsByCategory.get('electronics')?.[0].id).toBe(2)
  })

  it('filters products when search query is set', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    } as Response)

    const store = useProductsStore()
    await store.loadProducts()
    store.setSearchQuery('alpha')

    expect(store.filteredProducts).toHaveLength(1)
    expect(store.filteredProducts[0].title).toBe('Alpha Phone')
    expect(store.hasSearch).toBe(true)
  })

  it('stores API errors', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Server Error',
    } as Response)

    const store = useProductsStore()
    await store.loadProducts()

    expect(store.error).toMatch(/500/)
    expect(store.products).toHaveLength(0)
  })
})
