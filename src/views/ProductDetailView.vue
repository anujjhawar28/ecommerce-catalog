<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ErrorMessage from '../components/ErrorMessage.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import type { Product } from '../types/product'
import { categoryLabel } from '../types/product'
import { formatPrice } from '../utils/productHelpers'
import { useProductsStore } from '../stores/products'

const props = defineProps<{
  id: number
}>()

const store = useProductsStore()
const { detailLoading, detailError } = storeToRefs(store)
const product = ref<Product | null>(null)

const categoryName = computed(() =>
  product.value ? categoryLabel(product.value.category) : '',
)

async function load() {
  if (!Number.isFinite(props.id) || props.id <= 0) {
    product.value = null
    return
  }
  product.value = await store.loadProductDetail(props.id)
}

onMounted(() => {
  void load()
})

watch(
  () => props.id,
  () => {
    void load()
  },
)

function retry() {
  void load()
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-4 py-8">
    <nav class="mb-6" aria-label="Breadcrumb">
      <RouterLink
        to="/"
        class="text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        ← Back to catalog
      </RouterLink>
    </nav>

    <LoadingSpinner v-if="detailLoading" label="Loading product…" />

    <ErrorMessage
      v-else-if="detailError"
      :message="detailError"
      @retry="retry"
    />

    <article
      v-else-if="product"
      class="grid gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-2 lg:p-10"
    >
      <div class="flex items-center justify-center rounded-xl bg-slate-50 p-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-96 w-full object-contain"
          width="480"
          height="480"
        />
      </div>

      <div class="space-y-4">
        <p class="text-sm font-medium uppercase tracking-wide text-brand-600">
          {{ categoryName }}
        </p>
        <h1 class="text-2xl font-bold leading-tight text-ink sm:text-3xl">
          {{ product.title }}
        </h1>

        <p class="text-3xl font-bold text-brand-700">
          {{ formatPrice(product.price) }}
        </p>

        <p
          class="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-900"
          aria-label="Customer rating"
        >
          <span aria-hidden="true">★</span>
          {{ product.rating.rate.toFixed(1) }} / 5
          <span class="text-amber-800/70">({{ product.rating.count }} reviews)</span>
        </p>

        <h2 class="pt-2 text-sm font-semibold uppercase tracking-wide text-muted">
          Description
        </h2>
        <p class="leading-relaxed text-slate-700">{{ product.description }}</p>
      </div>
    </article>

    <p v-else class="text-center text-muted">Product not found.</p>
  </main>
</template>
