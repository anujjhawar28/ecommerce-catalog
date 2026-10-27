<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Product } from '../types/product'
import { categoryLabel } from '../types/product'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  category: string
  products: Product[]
}>()

const scrollerRef = ref<HTMLElement | null>(null)

const title = computed(() => categoryLabel(props.category))

function scrollBy(direction: -1 | 1) {
  const el = scrollerRef.value
  if (!el) return
  const amount = Math.min(el.clientWidth * 0.85, 640)
  el.scrollBy({ left: direction * amount, behavior: 'smooth' })
}
</script>

<template>
  <section v-if="products.length" class="space-y-3" :aria-labelledby="`cat-${category}`">
    <div class="flex items-center justify-between gap-4 px-1">
      <h2 :id="`cat-${category}`" class="text-lg font-bold text-ink sm:text-xl">
        {{ title }}
      </h2>
      <div class="flex gap-2" role="group" :aria-label="`${title} scroll controls`">
        <button
          type="button"
          class="cursor-pointer rounded-lg border border-slate-200 bg-white p-2 text-ink shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed"
          :aria-label="`Scroll ${title} left`"
          @click="scrollBy(-1)"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-lg border border-slate-200 bg-white p-2 text-ink shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed"
          :aria-label="`Scroll ${title} right`"
          @click="scrollBy(1)"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>

    <div
      ref="scrollerRef"
      class="flex items-stretch gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      tabindex="0"
      role="list"
      :aria-label="`${title} products`"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="w-56 min-w-[14rem] max-w-[14rem] shrink-0 snap-start sm:w-64 sm:min-w-[16rem] sm:max-w-[16rem]"
        role="listitem"
      >
        <ProductCard :product="product" />
      </div>
    </div>
  </section>
</template>
