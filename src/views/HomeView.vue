<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import CategoryRow from '../components/CategoryRow.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
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

    <section v-if="loading" aria-label="Loading products" aria-busy="true">
      <p class="sr-only" aria-live="polite">Loading products…</p>
      <ul
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        aria-hidden="true"
      >
        <li v-for="index in 8" :key="index">
          <article
            class="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div class="h-40 w-full animate-pulse bg-slate-100 sm:h-44" />
            <div class="flex flex-1 flex-col gap-3 p-4 pt-3">
              <div class="h-4 w-full animate-pulse rounded bg-slate-100" />
              <div class="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              <div class="mt-2 h-5 w-1/3 animate-pulse rounded bg-slate-100" />
              <div class="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
            </div>
          </article>
        </li>
      </ul>
    </section>

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

        <ul
          v-else
          class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-label="Search results"
        >
          <li v-for="product in filteredProducts" :key="product.id">
            <ProductCard :product="product" layout="grid" />
          </li>
        </ul>
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
