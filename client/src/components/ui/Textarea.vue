<template>
  <textarea
    v-bind="$attrs"
    :value="model"
    :class="
      cn(
        'flex min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/60',
        props.class,
      )
    "
    @input="model = $event.target.value"
  />
</template>

<script setup>
import { cn } from '@/lib/utils';

const model = defineModel({
  type: String,
  default: '',
});

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>
