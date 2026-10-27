import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { fetchAllProducts, fetchProductById } from '../api/products'
import type { Product } from '../types/product'
import { CATEGORY_ORDER } from '../types/product'
import {
  filterProductsByTitle,
  groupProductsByCategory,
  sortProductsByRating,
} from '../utils/productHelpers'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([...CATEGORY_ORDER])
  const searchQuery = ref('')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const detailLoading = ref(false)
  const detailError = ref<string | null>(null)
  const visitedProducts = ref<string[]>([])

  const sortedProducts = computed(() => sortProductsByRating(products.value))

  const filteredProducts = computed(() =>
    filterProductsByTitle(sortedProducts.value, searchQuery.value),
  )

  const productsByCategory = computed(() =>
    groupProductsByCategory(filteredProducts.value),
  )

  const hasSearch = computed(() => searchQuery.value.trim().length > 0)

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function getProductById(id: number): Product | undefined {
    return products.value.find((product) => product.id === id)
  }

  async function loadProducts(force = false) {
    if (!force && products.value.length > 0) return

    loading.value = true
    error.value = null
    try {
      products.value = await fetchAllProducts()
      const apiCategories = [...new Set(products.value.map((p) => p.category))]
      categories.value = CATEGORY_ORDER.filter((c) => apiCategories.includes(c))
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to load products'
      products.value = []
    } finally {
      loading.value = false
    }
  }

  async function loadProductDetail(id: number): Promise<Product | null> {
    const cached = getProductById(id)
    if (cached) return cached

    detailLoading.value = true
    detailError.value = null
    try {
      const product = await fetchProductById(id)
      const index = products.value.findIndex((p) => p.id === id)
      if (index === -1) {
        products.value.push(product)
      } else {
        products.value[index] = product
      }
      return product
    } catch (err) {
      detailError.value =
        err instanceof Error ? err.message : 'Failed to load product'
      return null
    } finally {
      detailLoading.value = false
    }
  }

  async function reloadProducts() {
    products.value = []
    await loadProducts(true)
  }

  function addVisitedProduct(id: number) {
    if (!visitedProducts.value.includes(id.toString())) {
      visitedProducts.value.push(id.toString())
    }
  }

  function $resetForTests() {
    products.value = []
    categories.value = [...CATEGORY_ORDER]
    searchQuery.value = ''
    loading.value = false
    error.value = null
    detailLoading.value = false
    detailError.value = null
  }

  const getVisitedProducts = computed(() => {
    return visitedProducts.value
  })

  return {
    products,
    categories,
    searchQuery,
    loading,
    error,
    detailLoading,
    detailError,
    sortedProducts,
    filteredProducts,
    productsByCategory,
    hasSearch,
    getVisitedProducts,
    setSearchQuery,
    getProductById,
    loadProducts,
    reloadProducts,
    loadProductDetail,
    addVisitedProduct,  
    $resetForTests,
  }
})
