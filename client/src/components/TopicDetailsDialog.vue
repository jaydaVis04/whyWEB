<template>
  <Dialog :open="open" size="xl" @close="$emit('close')">
    <div class="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
      <div class="space-y-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">Topic details</p>
            <h2 class="mt-2 font-display text-4xl font-semibold text-white">{{ topic?.title }}</h2>
            <div class="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">{{ topic?.category }}</Badge>
              <Badge :variant="difficultyVariant">{{ topic?.difficulty }}</Badge>
              <Badge :variant="statusVariant">{{ topic?.status }}</Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" @click="$emit('close')">✕</Button>
        </div>

        <div class="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Description</p>
          <p class="mt-4 text-base leading-8 text-slate-200">{{ topic?.description }}</p>
        </div>

        <div class="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-400/10 to-violet-400/10 p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">Why it matters</p>
          <p class="mt-4 text-base leading-8 text-slate-100">{{ topic?.whyItMatters }}</p>
        </div>
      </div>

      <div class="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Topic snapshot</p>
        <div class="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p class="text-sm text-slate-400">Date added</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ formattedDate }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p class="text-sm text-slate-400">Learning stage</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ topic?.status }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
          <p class="text-sm text-slate-400">Difficulty</p>
          <p class="mt-2 text-lg font-semibold text-white">{{ topic?.difficulty }}</p>
        </div>
        <Button class="w-full" @click="$emit('edit', topic)">Edit this topic</Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Dialog from '@/components/ui/Dialog.vue';
import { formatDate } from '@/lib/utils';

const props = defineProps({
  open: Boolean,
  topic: {
    type: Object,
    default: null,
  },
});

defineEmits(['close', 'edit']);

const difficultyVariant = computed(() => ({
  Beginner: 'default',
  Intermediate: 'accent',
  Advanced: 'warning',
}[props.topic?.difficulty] || 'secondary'));

const statusVariant = computed(() => ({
  Completed: 'success',
  Learning: 'warning',
  'Not Started': 'secondary',
}[props.topic?.status] || 'default'));

const formattedDate = computed(() => (props.topic?.dateAdded ? formatDate(props.topic.dateAdded) : ''));
</script>
