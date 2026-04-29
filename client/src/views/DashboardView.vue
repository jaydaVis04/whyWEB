<template>
  <div class="section-shell pb-20 pt-10">
    <section class="mb-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Card class="relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400" />
        <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="secondary">Server-backed CRUD workspace</Badge>
            <h1 class="mt-4 font-display text-4xl font-semibold text-white sm:text-5xl">Learning Topic Database</h1>
            <p class="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
              Manage the web development topics you want to study, explain why they matter, and track your progress
              with data stored on the server.
            </p>
          </div>

          <Button size="lg" @click="openCreateDialog">Add Topic</Button>
        </div>
      </Card>

      <Alert v-if="errorMessage" variant="destructive" class="h-full">
        <p class="font-semibold">Could not reach the server.</p>
        <p class="mt-2 text-sm text-red-100/90">
          {{ errorMessage }} Make sure the Express backend is running on `http://localhost:3001`.
        </p>
      </Alert>

      <Card v-else class="h-full">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Persistence check</p>
        <h2 class="mt-3 font-display text-2xl font-semibold text-white">Changes survive refresh.</h2>
        <p class="mt-3 text-sm leading-7 text-slate-300">
          Every create, edit, and delete action updates `server/data/topics.json`, so your class demo can prove the app
          is using real server-side storage.
        </p>
      </Card>
    </section>

    <StatsCards :stats="stats" />

    <section class="mt-8">
      <FilterBar
        v-model:search="search"
        v-model:category="categoryFilter"
        v-model:difficulty="difficultyFilter"
        v-model:status="statusFilter"
        v-model:activeView="activeView"
        :categories="categories"
        :difficulties="difficulties"
        :statuses="statuses"
      />
    </section>

    <section class="mt-8">
      <Alert v-if="successMessage" class="mb-6">
        <p class="font-semibold text-sky-50">Update saved</p>
        <p class="mt-2 text-sm text-sky-100/90">{{ successMessage }}</p>
      </Alert>

      <LoadingState v-if="loading" />

      <EmptyState
        v-else-if="filteredTopics.length === 0"
        title="No topics match your filters."
        message="Try clearing the search or filter options, or add a new topic to expand the database."
      >
        <Button variant="secondary" @click="resetFilters">Reset filters</Button>
      </EmptyState>

      <div v-else-if="activeView === 'cards'" class="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        <TopicCard
          v-for="topic in filteredTopics"
          :key="topic.id"
          :topic="topic"
          @view="openDetailsDialog"
          @edit="openEditDialog"
          @delete="handleDelete"
        />
      </div>

      <Card v-else class="overflow-hidden p-0">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-white/5">
              <tr class="text-left text-xs uppercase tracking-[0.25em] text-slate-400">
                <th class="px-6 py-4">Title</th>
                <th class="px-6 py-4">Category</th>
                <th class="px-6 py-4">Difficulty</th>
                <th class="px-6 py-4">Status</th>
                <th class="px-6 py-4">Date Added</th>
                <th class="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="topic in filteredTopics"
                :key="topic.id"
                class="border-t border-white/10 text-sm text-slate-200 transition hover:bg-white/5"
              >
                <td class="px-6 py-4">
                  <div>
                    <p class="font-semibold text-white">{{ topic.title }}</p>
                    <p class="mt-1 max-w-md text-slate-400">{{ topic.description }}</p>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <Badge variant="secondary">{{ topic.category }}</Badge>
                </td>
                <td class="px-6 py-4">
                  <Badge :variant="getDifficultyVariant(topic.difficulty)">{{ topic.difficulty }}</Badge>
                </td>
                <td class="px-6 py-4">
                  <Badge :variant="getStatusVariant(topic.status)">{{ topic.status }}</Badge>
                </td>
                <td class="px-6 py-4">{{ formatDate(topic.dateAdded) }}</td>
                <td class="px-6 py-4">
                  <div class="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" @click="openDetailsDialog(topic)">View</Button>
                    <Button variant="ghost" size="sm" @click="openEditDialog(topic)">Edit</Button>
                    <Button variant="destructive" size="sm" @click="handleDelete(topic)">Delete</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </section>

    <TopicFormDialog
      :open="formDialogOpen"
      :topic="selectedTopic"
      :submitting="formSubmitting"
      :error-message="formError"
      :categories="categories"
      :difficulties="difficulties"
      :statuses="statuses"
      @close="closeFormDialog"
      @submit="handleFormSubmit"
    />

    <TopicDetailsDialog
      :open="detailsDialogOpen"
      :topic="selectedTopic"
      @close="detailsDialogOpen = false"
      @edit="openEditDialog"
    />

    <DeleteConfirmDialog
      :open="deleteDialogOpen"
      :topic="topicPendingDelete"
      :submitting="deleteSubmitting"
      @close="closeDeleteDialog"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { Blocks, CircleCheckBig, Loader, Rocket } from 'lucide-vue-next';
import Alert from '@/components/ui/Alert.vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import EmptyState from '@/components/EmptyState.vue';
import FilterBar from '@/components/FilterBar.vue';
import LoadingState from '@/components/LoadingState.vue';
import StatsCards from '@/components/StatsCards.vue';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog.vue';
import TopicCard from '@/components/TopicCard.vue';
import TopicDetailsDialog from '@/components/TopicDetailsDialog.vue';
import TopicFormDialog from '@/components/TopicFormDialog.vue';
import { formatDate } from '@/lib/utils';
import { topicsApi } from '@/services/topicsApi';

const categories = [
  'HTML',
  'CSS',
  'JavaScript',
  'Vue',
  'Backend',
  'APIs',
  'Databases',
  'Deployment',
  'UI Design',
];
const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
const statuses = ['Not Started', 'Learning', 'Completed'];

const loading = ref(true);
const errorMessage = ref('');
const successMessage = ref('');
const formError = ref('');
const formSubmitting = ref(false);
const topics = ref([]);
const selectedTopic = ref(null);
const formDialogOpen = ref(false);
const detailsDialogOpen = ref(false);
const deleteDialogOpen = ref(false);
const deleteSubmitting = ref(false);
const topicPendingDelete = ref(null);

const search = ref('');
const categoryFilter = ref('');
const difficultyFilter = ref('');
const statusFilter = ref('');
const activeView = ref('cards');

const filteredTopics = computed(() =>
  topics.value.filter((topic) => {
    const searchMatches =
      !search.value ||
      [topic.title, topic.description, topic.whyItMatters]
        .join(' ')
        .toLowerCase()
        .includes(search.value.toLowerCase());

    const categoryMatches = !categoryFilter.value || topic.category === categoryFilter.value;
    const difficultyMatches = !difficultyFilter.value || topic.difficulty === difficultyFilter.value;
    const statusMatches = !statusFilter.value || topic.status === statusFilter.value;

    return searchMatches && categoryMatches && difficultyMatches && statusMatches;
  }),
);

const stats = computed(() => [
  {
    label: 'Total topics',
    value: topics.value.length,
    help: 'Every topic stored in the JSON database',
    icon: Blocks,
    iconWrapClass: 'rounded-2xl bg-sky-400/10 p-3 text-sky-200',
    barClass: 'from-sky-400 to-cyan-300',
  },
  {
    label: 'Completed',
    value: topics.value.filter((topic) => topic.status === 'Completed').length,
    help: 'Skills already checked off',
    icon: CircleCheckBig,
    iconWrapClass: 'rounded-2xl bg-emerald-400/10 p-3 text-emerald-200',
    barClass: 'from-emerald-400 to-teal-300',
  },
  {
    label: 'Learning',
    value: topics.value.filter((topic) => topic.status === 'Learning').length,
    help: 'Topics currently in progress',
    icon: Loader,
    iconWrapClass: 'rounded-2xl bg-violet-400/10 p-3 text-violet-200',
    barClass: 'from-violet-400 to-fuchsia-300',
  },
  {
    label: 'Not started',
    value: topics.value.filter((topic) => topic.status === 'Not Started').length,
    help: 'Ideas waiting in the pipeline',
    icon: Rocket,
    iconWrapClass: 'rounded-2xl bg-amber-400/10 p-3 text-amber-200',
    barClass: 'from-amber-400 to-orange-300',
  },
]);

onMounted(() => {
  fetchTopics();
});

async function fetchTopics() {
  loading.value = true;
  errorMessage.value = '';

  try {
    topics.value = await topicsApi.getTopics();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

function resetFilters() {
  search.value = '';
  categoryFilter.value = '';
  difficultyFilter.value = '';
  statusFilter.value = '';
}

function openCreateDialog() {
  selectedTopic.value = null;
  formError.value = '';
  formDialogOpen.value = true;
}

function openEditDialog(topic) {
  detailsDialogOpen.value = false;
  selectedTopic.value = { ...topic };
  formError.value = '';
  formDialogOpen.value = true;
}

function openDetailsDialog(topic) {
  selectedTopic.value = topic;
  detailsDialogOpen.value = true;
}

function closeFormDialog() {
  formDialogOpen.value = false;
  formError.value = '';
}

function getDifficultyVariant(difficulty) {
  return {
    Beginner: 'default',
    Intermediate: 'accent',
    Advanced: 'warning',
  }[difficulty] || 'secondary';
}

function getStatusVariant(status) {
  return {
    Completed: 'success',
    Learning: 'warning',
    'Not Started': 'secondary',
  }[status] || 'default';
}

async function handleFormSubmit(payload) {
  formSubmitting.value = true;
  formError.value = '';
  successMessage.value = '';

  try {
    if (selectedTopic.value?.id) {
      const updatedTopic = await topicsApi.updateTopic(selectedTopic.value.id, payload);
      topics.value = topics.value.map((topic) => (topic.id === updatedTopic.id ? updatedTopic : topic));
      successMessage.value = `"${updatedTopic.title}" was updated successfully.`;
    } else {
      const createdTopic = await topicsApi.createTopic(payload);
      topics.value = [createdTopic, ...topics.value];
      successMessage.value = `"${createdTopic.title}" was added to the topic database.`;
    }

    formDialogOpen.value = false;
  } catch (error) {
    formError.value = error.message;
  } finally {
    formSubmitting.value = false;
  }
}

async function handleDelete(topic) {
  topicPendingDelete.value = topic;
  deleteDialogOpen.value = true;
}

function closeDeleteDialog() {
  deleteDialogOpen.value = false;
  topicPendingDelete.value = null;
}

async function confirmDelete() {
  if (!topicPendingDelete.value) {
    return;
  }

  deleteSubmitting.value = true;
  successMessage.value = '';

  try {
    const deletedTitle = topicPendingDelete.value.title;
    await topicsApi.deleteTopic(topicPendingDelete.value.id);
    topics.value = topics.value.filter((item) => item.id !== topicPendingDelete.value.id);

    if (selectedTopic.value?.id === topicPendingDelete.value.id) {
      selectedTopic.value = null;
      detailsDialogOpen.value = false;
    }

    closeDeleteDialog();
    successMessage.value = `"${deletedTitle}" was deleted from the database.`;
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    deleteSubmitting.value = false;
  }
}
</script>
