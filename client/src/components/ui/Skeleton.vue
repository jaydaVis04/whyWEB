<template>
  <div :class="cn('animate-pulse rounded-2xl bg-white/8', props.class)" />
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
