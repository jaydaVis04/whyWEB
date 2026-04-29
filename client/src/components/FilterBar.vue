<template>
  <Card class="space-y-5">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div class="space-y-2">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">Refine your database</p>
        <h2 class="font-display text-2xl font-semibold text-white">Search, sort, and focus your next skill.</h2>
      </div>

      <div class="inline-flex rounded-full border border-white/10 bg-white/5 p-1">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          type="button"
          class="rounded-full px-4 py-2 text-sm font-medium transition"
          :class="activeViewModel === tab.value ? 'bg-white text-slate-950' : 'text-slate-300 hover:text-white'"
          @click="activeViewModel = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-[2fr_1fr_1fr_1fr]">
      <div>
        <label class="mb-2 block text-sm text-slate-400">Search topics</label>
        <Input v-model="searchModel" placeholder="Search by title, reason, or description" />
      </div>

      <div>
        <label class="mb-2 block text-sm text-slate-400">Category</label>
        <Select v-model="categoryModel">
          <option value="">All categories</option>
          <option v-for="item in categories" :key="item" :value="item">
            {{ item }}
          </option>
        </Select>
      </div>

      <div>
        <label class="mb-2 block text-sm text-slate-400">Difficulty</label>
        <Select v-model="difficultyModel">
          <option value="">All difficulty levels</option>
          <option v-for="item in difficulties" :key="item" :value="item">
            {{ item }}
          </option>
        </Select>
      </div>

      <div>
        <label class="mb-2 block text-sm text-slate-400">Status</label>
        <Select v-model="statusModel">
          <option value="">All statuses</option>
          <option v-for="item in statuses" :key="item" :value="item">
            {{ item }}
          </option>
        </Select>
      </div>
    </div>
  </Card>
</template>

<script setup>
import Card from '@/components/ui/Card.vue';
import Input from '@/components/ui/Input.vue';
import Select from '@/components/ui/Select.vue';

const searchModel = defineModel('search');
const categoryModel = defineModel('category');
const difficultyModel = defineModel('difficulty');
const statusModel = defineModel('status');
const activeViewModel = defineModel('activeView');

defineProps({
  categories: Array,
  difficulties: Array,
  statuses: Array,
});

const tabs = [
  { label: 'Card view', value: 'cards' },
  { label: 'Table view', value: 'table' },
];
</script>
