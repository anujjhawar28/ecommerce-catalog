import type { Product } from '../types/product'

const BASE_URL = 'https://fakestoreapi.com'

async function parseJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json() as Promise<T>
}

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`)
  return parseJson<Product[]>(response)
}

export async function fetchProductCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`)
  return parseJson<string[]>(response)
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`)
  return parseJson<Product>(response)
}
