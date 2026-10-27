<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SearchBar from './SearchBar.vue'

const searchQuery = defineModel<string>('searchQuery', { required: true })
</script>

<template>
  <header
    role="banner"
    class="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur"
  >
    <div
      class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5"
    >
      <RouterLink
        to="/"
        class="text-xl font-bold tracking-tight text-brand-700 hover:text-brand-600"
      >
        Shop Catalog
      </RouterLink>
      <SearchBar id="header-search" v-model="searchQuery" />
    </div>
  </header>
</template>
