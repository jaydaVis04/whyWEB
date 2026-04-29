<template>
  <span :class="badgeClasses">
    <slot />
  </span>
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

const badgeClasses = computed(() =>
  cn(
    'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]',
    {
      'border-sky-400/30 bg-sky-400/10 text-sky-100': props.variant === 'default',
      'border-violet-400/30 bg-violet-400/10 text-violet-100': props.variant === 'accent',
      'border-emerald-400/30 bg-emerald-400/10 text-emerald-100': props.variant === 'success',
      'border-amber-400/30 bg-amber-400/10 text-amber-100': props.variant === 'warning',
      'border-white/15 bg-white/5 text-slate-200': props.variant === 'secondary',
    },
    props.class,
  ),
);
</script>
