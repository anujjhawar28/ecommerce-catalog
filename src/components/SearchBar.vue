<script setup lang="ts">
const model = defineModel<string>({ required: true })

defineProps<{
  id?: string
}>()
</script>

<template>
  <div class="relative w-full max-w-xl">
    <label :for="id ?? 'product-search'" class="sr-only">Search products</label>
    <span
      class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted"
      aria-hidden="true"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
    </span>
    <input
      :id="id ?? 'product-search'"
      v-model="model"
      type="search"
      name="search"
      autocomplete="off"
      placeholder="Search by product name…"
      class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    />
  </div>
</template>
