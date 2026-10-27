<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import { useProductsStore } from './stores/products'

const store = useProductsStore()
const { searchQuery } = storeToRefs(store)
</script>

<template>
  <div class="min-h-screen">
    <AppHeader v-model:search-query="searchQuery" />
    <RouterView />
  </div>
</template>
