<template>
  <Dialog :open="open" size="lg" @close="$emit('close')">
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">
          {{ isEditing ? 'Update topic' : 'Create topic' }}
        </p>
        <h2 class="mt-2 font-display text-3xl font-semibold text-white">
          {{ isEditing ? 'Edit learning topic' : 'Add a learning topic' }}
        </h2>
        <p class="mt-2 max-w-2xl text-sm leading-7 text-slate-400">
          Track what you want to learn, why it matters, and how far along you are.
        </p>
      </div>
      <Button variant="ghost" size="icon" @click="$emit('close')">✕</Button>
    </div>

    <form class="mt-8 space-y-6" @submit.prevent="submitForm">
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <label class="mb-2 block text-sm text-slate-300">Title</label>
          <Input v-model="form.title" placeholder="Example: Accessibility Basics" />
        </div>
        <div>
          <label class="mb-2 block text-sm text-slate-300">Date added</label>
          <Input v-model="form.dateAdded" type="date" />
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div>
          <label class="mb-2 block text-sm text-slate-300">Category</label>
          <Select v-model="form.category">
            <option value="" disabled>Select category</option>
            <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
          </Select>
        </div>
        <div>
          <label class="mb-2 block text-sm text-slate-300">Difficulty</label>
          <Select v-model="form.difficulty">
            <option value="" disabled>Select difficulty</option>
            <option v-for="item in difficulties" :key="item" :value="item">{{ item }}</option>
          </Select>
        </div>
        <div>
          <label class="mb-2 block text-sm text-slate-300">Status</label>
          <Select v-model="form.status">
            <option value="" disabled>Select status</option>
            <option v-for="item in statuses" :key="item" :value="item">{{ item }}</option>
          </Select>
        </div>
      </div>

      <div>
        <label class="mb-2 block text-sm text-slate-300">Description</label>
        <Textarea
          v-model="form.description"
          placeholder="Describe what this topic covers and what you would learn."
        />
      </div>

      <div>
        <label class="mb-2 block text-sm text-slate-300">Why it matters</label>
        <Textarea
          v-model="form.whyItMatters"
          placeholder="Explain why this topic is useful in real web development."
        />
      </div>

      <Alert v-if="errorMessage" variant="destructive">
        {{ errorMessage }}
      </Alert>

      <div class="flex flex-wrap justify-end gap-3">
        <Button type="button" variant="ghost" @click="$emit('close')">Cancel</Button>
        <Button type="submit" :disabled="submitting">
          {{ submitting ? 'Saving...' : isEditing ? 'Save changes' : 'Create topic' }}
        </Button>
      </div>
    </form>
  </Dialog>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import Alert from '@/components/ui/Alert.vue';
import Button from '@/components/ui/Button.vue';
import Dialog from '@/components/ui/Dialog.vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';
import Textarea from '@/components/ui/Textarea.vue';

const emptyForm = () => ({
  title: '',
  category: '',
  difficulty: '',
  description: '',
  whyItMatters: '',
  status: '',
  dateAdded: new Date().toISOString().slice(0, 10),
});

const props = defineProps({
  open: Boolean,
  topic: {
    type: Object,
    default: null,
  },
  submitting: Boolean,
  errorMessage: String,
  categories: Array,
  difficulties: Array,
  statuses: Array,
});

const emit = defineEmits(['close', 'submit']);

const form = reactive(emptyForm());

const isEditing = computed(() => Boolean(props.topic?.id));

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      return;
    }

    Object.assign(form, props.topic ? { ...props.topic } : emptyForm());
  },
  { immediate: true },
);

function submitForm() {
  emit('submit', { ...form });
}
</script>
