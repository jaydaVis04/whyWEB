<template>
  <div :class="alertClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
  },
  class: {
    type: String,
    default: '',
  },
});

const alertClasses = computed(() =>
  cn(
    'rounded-2xl border px-4 py-4 text-sm',
    {
      'border-sky-400/20 bg-sky-400/10 text-sky-100': props.variant === 'default',
      'border-red-500/30 bg-red-500/10 text-red-100': props.variant === 'destructive',
    },
    props.class,
  ),
);
</script>
