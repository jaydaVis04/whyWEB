<template>
  <div :class="cn('glass-panel rounded-3xl p-6 shadow-2xl shadow-slate-950/30', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/lib/utils';

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>
