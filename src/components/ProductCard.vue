<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/productHelpers'
import { useProductsStore } from '../stores/products';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  product: Product
  layout?: 'carousel' | 'grid'
}>()

const  store = useProductsStore();
const { addVisitedProduct } = store;
const { getVisitedProducts } = storeToRefs(store);
const isProductVisited = computed(() => getVisitedProducts.value.includes(props.product.id.toString()));
</script>

<template>
  <article
    class="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    :class="layout === 'grid' ? 'w-full' : 'w-full shrink-0'"
  >
    <RouterLink
      :to="{ name: 'product-detail', params: { id: product.id } }"
      @click="addVisitedProduct(product.id)"
      class="flex h-full min-h-0 flex-col focus-visible:rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <div
        class="flex h-40 w-full shrink-0 items-center justify-center overflow-hidden bg-slate-50 p-3 sm:h-44"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="max-h-full max-w-full object-contain object-center"
          loading="lazy"
          width="256"
          height="256"
        />
      </div>
      <div class="flex flex-1 flex-col gap-2 p-4 pt-3">
        <h3
          class="line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug text-ink"
        >
          {{ product.title }}
        </h3>
        <p class="mt-auto text-base font-bold text-brand-700">
          {{ formatPrice(product.price) }}
        </p>
        <p class="text-xs text-muted" aria-label="Rating">
          ★ {{ product.rating.rate.toFixed(1) }}
          <span class="text-slate-400">({{ product.rating.count }})</span>
          <div v-if="isProductVisited" class="mt-1 text-xs text-green-600">
            Visited
          </div>
        </p>
      </div>
    </RouterLink>
  </article>
</template>
