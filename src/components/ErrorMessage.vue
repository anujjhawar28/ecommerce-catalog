<script setup lang="ts">
defineProps<{
  message: string
  title?: string
}>()

defineEmits<{
  retry: []
}>()
</script>

<template>
  <section
    class="rounded-xl border border-red-200 bg-red-50 p-6 text-center"
    role="alert"
    aria-live="assertive"
  >
    <h2 class="text-lg font-semibold text-red-900">
      {{ title ?? 'Something went wrong' }}
    </h2>
    <p class="mt-2 text-sm text-red-800">{{ message }}</p>
    <button
      type="button"
      class="mt-4 cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </section>
</template>
