<template>
  <input
    v-bind="$attrs"
    :value="model"
    :class="
      cn(
        'flex h-11 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60',
        props.class,
      )
    "
    @input="model = $event.target.value"
  />
</template>

<script setup>
import { cn } from '@/lib/utils';

const model = defineModel({
  type: [String, Number],
  default: '',
});

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>
