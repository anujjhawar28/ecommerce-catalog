<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import CategoryRow from '../components/CategoryRow.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductsStore } from '../stores/products'

const store = useProductsStore()
const {
  categories,
  productsByCategory,
  filteredProducts,
  hasSearch,
  loading,
  error,
} = storeToRefs(store)

onMounted(() => {
  void store.loadProducts()
})

function retry() {
  void store.reloadProducts()
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <div class="mb-8">
      <h1 class="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        Product dashboard
      </h1>
      <p class="mt-2 max-w-2xl text-sm text-muted sm:text-base">
        Browse top-rated items by category, or use the search bar above to filter
        by product title.
      </p>
    </div>

    <LoadingSpinner v-if="loading" label="Loading products…" />

    <ErrorMessage
      v-else-if="error"
      :message="error"
      @retry="retry"
    />

    <template v-else>
      <section
        v-if="hasSearch"
        class="space-y-4"
        aria-labelledby="search-results-heading"
      >
        <h2 id="search-results-heading" class="text-lg font-semibold">
          Search results
          <span class="text-muted">({{ filteredProducts.length }})</span>
        </h2>

        <p v-if="filteredProducts.length === 0" class="text-sm text-muted">
          No products match your search. Try a different name.
        </p>

        <div
          v-else
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Search results"
        >
          <div v-for="product in filteredProducts" :key="product.id" role="listitem">
            <ProductCard :product="product" layout="grid" />
          </div>
        </div>
      </section>

      <div v-else class="space-y-10">
        <CategoryRow
          v-for="category in categories"
          :key="category"
          :category="category"
          :products="productsByCategory.get(category) ?? []"
        />
      </div>
    </template>
  </main>
</template>
