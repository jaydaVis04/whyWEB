<template>
  <Card class="group h-full transition duration-300 hover:-translate-y-1 hover:border-sky-400/20">
    <div class="flex h-full flex-col gap-5">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{{ topic.category }}</p>
          <h3 class="mt-2 font-display text-2xl font-semibold text-white">{{ topic.title }}</h3>
        </div>
        <Badge :variant="statusVariant">{{ topic.status }}</Badge>
      </div>

      <p class="text-sm leading-7 text-slate-300">{{ topic.description }}</p>

      <div class="flex flex-wrap gap-2">
        <Badge variant="secondary">{{ topic.category }}</Badge>
        <Badge :variant="difficultyVariant">{{ topic.difficulty }}</Badge>
        <Badge variant="accent">{{ formattedDate }}</Badge>
      </div>

      <div class="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Why it matters</p>
        <p class="mt-2 text-sm leading-7 text-slate-300">{{ topic.whyItMatters }}</p>
      </div>

      <div class="mt-auto flex flex-wrap gap-3 pt-2">
        <Button variant="secondary" size="sm" @click="$emit('view', topic)">View details</Button>
        <Button variant="ghost" size="sm" @click="$emit('edit', topic)">Edit</Button>
        <Button variant="destructive" size="sm" @click="$emit('delete', topic)">Delete</Button>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { computed } from 'vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import { formatDate } from '@/lib/utils';

const props = defineProps({
  topic: {
    type: Object,
    required: true,
  },
});

defineEmits(['view', 'edit', 'delete']);

const formattedDate = computed(() => formatDate(props.topic.dateAdded));

const statusVariant = computed(() => ({
  Completed: 'success',
  Learning: 'warning',
  'Not Started': 'secondary',
}[props.topic.status] || 'default'));

const difficultyVariant = computed(() => ({
  Beginner: 'default',
  Intermediate: 'accent',
  Advanced: 'warning',
}[props.topic.difficulty] || 'secondary'));
</script>
