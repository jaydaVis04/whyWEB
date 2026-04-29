<template>
  <Card class="overflow-hidden text-center">
    <div class="mx-auto flex max-w-xl flex-col items-center gap-5 py-8">
      <div class="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 text-3xl">⌘</div>
      <div>
        <h3 class="font-display text-2xl font-semibold text-white">{{ title }}</h3>
        <p class="mt-3 text-sm leading-7 text-slate-400">{{ message }}</p>
      </div>
      <slot />
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/Card.vue';

defineProps({
  title: String,
  message: String,
});
</script>
