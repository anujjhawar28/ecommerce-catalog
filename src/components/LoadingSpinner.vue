<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>

<template>
  <output
    class="flex flex-col items-center justify-center gap-3 py-12"
    aria-live="polite"
  >
    <span
      class="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600"
      aria-hidden="true"
    />
    <span class="text-sm text-muted">{{ label ?? 'Loading…' }}</span>
  </output>
</template>
