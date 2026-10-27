<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-3 py-12"
    role="status"
    aria-live="polite"
  >
    <div
      class="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
      aria-hidden="true"
    />
    <p class="text-sm text-muted">{{ label ?? 'Loading…' }}</p>
  </div>
</template>
