<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <Card
      v-for="stat in stats"
      :key="stat.label"
      class="relative overflow-hidden"
    >
      <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r" :class="stat.barClass" />
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm text-slate-400">{{ stat.label }}</p>
          <p class="mt-3 font-display text-4xl font-bold text-white">{{ stat.value }}</p>
          <p class="mt-2 text-sm text-slate-500">{{ stat.help }}</p>
        </div>
        <div :class="stat.iconWrapClass">
          <component :is="stat.icon" class="h-5 w-5" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/ui/Card.vue';

defineProps({
  stats: {
    type: Array,
    required: true,
  },
});
</script>
