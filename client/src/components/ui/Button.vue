<template>
  <component
    :is="as"
    :type="as === 'button' ? type : undefined"
    :disabled="disabled"
    :class="buttonClasses"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps({
  as: {
    type: String,
    default: 'button',
  },
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
  },
  size: {
    type: String,
    default: 'default',
  },
  class: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonClasses = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/80 disabled:pointer-events-none disabled:opacity-50',
    {
      'bg-sky-400 text-slate-950 shadow-glow hover:bg-sky-300': props.variant === 'default',
      'border border-white/10 bg-white/5 text-white hover:bg-white/10': props.variant === 'secondary',
      'border border-red-400/30 bg-red-500/10 text-red-100 hover:bg-red-500/20': props.variant === 'destructive',
      'text-slate-300 hover:bg-white/5 hover:text-white': props.variant === 'ghost',
      'h-11 px-5': props.size === 'default',
      'h-10 px-4': props.size === 'sm',
      'h-12 px-6 text-base': props.size === 'lg',
      'h-11 w-11 p-0': props.size === 'icon',
    },
    props.class,
  ),
);
</script>
