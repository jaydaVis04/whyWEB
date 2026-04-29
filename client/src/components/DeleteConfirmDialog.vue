<template>
  <Dialog :open="open" size="sm" @close="$emit('close')">
    <div class="space-y-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-red-200/80">Delete topic</p>
          <h2 class="mt-2 font-display text-3xl font-semibold text-white">Remove this topic?</h2>
        </div>
        <Button variant="ghost" size="icon" @click="$emit('close')">✕</Button>
      </div>

      <div class="rounded-3xl border border-red-400/20 bg-red-500/10 p-5">
        <p class="text-sm leading-7 text-red-50">
          You are about to delete
          <span class="font-semibold text-white">{{ topic?.title }}</span>.
          This updates the server data and removes it from the dashboard immediately.
        </p>
      </div>

      <div class="flex flex-wrap justify-end gap-3">
        <Button variant="ghost" @click="$emit('close')">Cancel</Button>
        <Button variant="destructive" :disabled="submitting" @click="$emit('confirm')">
          {{ submitting ? 'Deleting...' : 'Delete topic' }}
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import Button from '@/components/ui/Button.vue';
import Dialog from '@/components/ui/Dialog.vue';

defineProps({
  open: Boolean,
  topic: {
    type: Object,
    default: null,
  },
  submitting: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['close', 'confirm']);
</script>
