<template>
  <div class="pb-20">
    <section class="hero-grid relative overflow-hidden border-b border-white/10">
      <div class="section-shell grid gap-14 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div class="relative">
          <Badge class="mb-6" variant="secondary">Modern developer education platform</Badge>
          <h1 class="max-w-4xl font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            From curiosity to capability: track the skills that make the web work.
          </h1>
          <p class="mt-6 max-w-2xl text-balance text-lg leading-8 text-slate-300">
            whyWEB explains why web development matters and gives you a polished database for managing the
            technologies behind websites, apps, dashboards, portfolios, and digital businesses.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink to="/dashboard">
              <Button size="lg">Launch Topic Tracker</Button>
            </RouterLink>
            <a href="#why-it-matters">
              <Button variant="secondary" size="lg">Explore why it matters</Button>
            </a>
          </div>

          <div class="mt-10 grid max-w-3xl gap-4 sm:grid-cols-4">
            <div v-for="stat in heroStats" :key="stat.label" class="glass-panel rounded-2xl p-4">
              <p class="text-sm text-slate-400">{{ stat.label }}</p>
              <p class="mt-2 font-display text-3xl font-bold text-white">{{ stat.value }}</p>
            </div>
          </div>
        </div>

        <Card class="relative overflow-hidden border-sky-400/20 bg-slate-900/70">
          <div class="absolute right-0 top-0 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
          <div class="relative space-y-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Learning momentum</p>
                <h2 class="mt-2 font-display text-3xl font-semibold text-white">whyWEB snapshot</h2>
              </div>
              <Badge variant="accent">Live server data</Badge>
            </div>

            <StatsCards :stats="dashboardStats" />
          </div>
        </Card>
      </div>
    </section>

    <section class="section-shell py-16">
      <div class="flex items-end justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">Core tracks</p>
          <h2 class="mt-2 font-display text-4xl font-semibold text-white">Six pillars of modern web work.</h2>
        </div>
        <p class="max-w-xl text-sm leading-7 text-slate-400">
          Great web developers combine interface craft, logic, data, and deployment. These areas show why the field
          stays useful across careers, businesses, and creative projects.
        </p>
      </div>

      <div class="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <Card
          v-for="feature in features"
          :key="feature.title"
          class="group relative overflow-hidden border-white/10 transition duration-300 hover:border-sky-400/20"
        >
          <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r" :class="feature.barClass" />
          <div class="flex items-start gap-4">
            <div :class="feature.iconClass">
              <component :is="feature.icon" class="h-5 w-5" />
            </div>
            <div>
              <h3 class="font-display text-2xl font-semibold text-white">{{ feature.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-slate-300">{{ feature.description }}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <section id="why-it-matters" class="border-y border-white/10 bg-slate-950/60 py-16">
      <div class="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div class="space-y-4">
          <Badge>Why learn web development?</Badge>
          <h2 class="font-display text-4xl font-semibold text-white">Because the web is where ideas become accessible.</h2>
          <p class="text-lg leading-8 text-slate-300">
            Web development lets people build public-facing products fast. It powers portfolios, stores, communities,
            data dashboards, landing pages, tools, learning platforms, and startup prototypes.
          </p>
        </div>

        <div class="grid gap-4">
          <Card v-for="reason in reasons" :key="reason.title" class="flex gap-4">
            <div class="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/5">
              <component :is="reason.icon" class="h-5 w-5 text-sky-300" />
            </div>
            <div>
              <h3 class="font-display text-xl font-semibold text-white">{{ reason.title }}</h3>
              <p class="mt-2 text-sm leading-7 text-slate-300">{{ reason.copy }}</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import {
  Blocks,
  CodeXml,
  Database,
  LayoutDashboard,
  Paintbrush,
  Rocket,
  Server,
  Workflow,
} from 'lucide-vue-next';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Card from '@/components/ui/Card.vue';
import StatsCards from '@/components/StatsCards.vue';
import { topicsApi } from '@/services/topicsApi';

const topics = ref([]);
const statsReady = ref(false);

onMounted(async () => {
  try {
    topics.value = await topicsApi.getTopics();
  } catch (error) {
    topics.value = [];
  } finally {
    statsReady.value = true;
  }
});

const heroStats = computed(() => {
  if (!statsReady.value) {
    return [
      { label: 'Total topics', value: 7 },
      { label: 'Completed', value: 1 },
      { label: 'In progress', value: 2 },
      { label: 'Beginner', value: 2 },
    ];
  }

  const total = topics.value.length;
  const completed = topics.value.filter((topic) => topic.status === 'Completed').length;
  const learning = topics.value.filter((topic) => topic.status === 'Learning').length;
  const beginner = topics.value.filter((topic) => topic.difficulty === 'Beginner').length;

  return [
    { label: 'Total topics', value: total },
    { label: 'Completed', value: completed },
    { label: 'In progress', value: learning },
    { label: 'Beginner', value: beginner },
  ];
});

const dashboardStats = computed(() => {
  if (!statsReady.value) {
    return [
      {
        label: 'Total topics',
        value: 7,
        help: 'Concepts in your server-backed tracker',
        icon: LayoutDashboard,
        iconWrapClass: 'rounded-2xl bg-sky-400/10 p-3 text-sky-200',
        barClass: 'from-sky-400 to-cyan-300',
      },
      {
        label: 'Completed',
        value: 1,
        help: 'Topics already understood well',
        icon: Workflow,
        iconWrapClass: 'rounded-2xl bg-emerald-400/10 p-3 text-emerald-200',
        barClass: 'from-emerald-400 to-teal-300',
      },
      {
        label: 'Topics in progress',
        value: 2,
        help: 'Skills currently being practiced',
        icon: CodeXml,
        iconWrapClass: 'rounded-2xl bg-violet-400/10 p-3 text-violet-200',
        barClass: 'from-violet-400 to-fuchsia-300',
      },
      {
        label: 'Beginner topics',
        value: 2,
        help: 'A strong place to start quickly',
        icon: Blocks,
        iconWrapClass: 'rounded-2xl bg-amber-400/10 p-3 text-amber-200',
        barClass: 'from-amber-400 to-orange-300',
      },
    ];
  }

  return [
    {
      label: 'Total topics',
      value: topics.value.length,
      help: 'Concepts in your server-backed tracker',
      icon: LayoutDashboard,
      iconWrapClass: 'rounded-2xl bg-sky-400/10 p-3 text-sky-200',
      barClass: 'from-sky-400 to-cyan-300',
    },
    {
      label: 'Completed',
      value: topics.value.filter((topic) => topic.status === 'Completed').length,
      help: 'Topics already understood well',
      icon: Workflow,
      iconWrapClass: 'rounded-2xl bg-emerald-400/10 p-3 text-emerald-200',
      barClass: 'from-emerald-400 to-teal-300',
    },
    {
      label: 'Topics in progress',
      value: topics.value.filter((topic) => topic.status === 'Learning').length,
      help: 'Skills currently being practiced',
      icon: CodeXml,
      iconWrapClass: 'rounded-2xl bg-violet-400/10 p-3 text-violet-200',
      barClass: 'from-violet-400 to-fuchsia-300',
    },
    {
      label: 'Beginner topics',
      value: topics.value.filter((topic) => topic.difficulty === 'Beginner').length,
      help: 'A strong place to start quickly',
      icon: Blocks,
      iconWrapClass: 'rounded-2xl bg-amber-400/10 p-3 text-amber-200',
      barClass: 'from-amber-400 to-orange-300',
    },
  ];
});

const features = [
  {
    title: 'Frontend',
    description: 'Create interfaces that are responsive, readable, and expressive across phones, tablets, and laptops.',
    icon: LayoutDashboard,
    iconClass: 'rounded-2xl bg-sky-400/10 p-3 text-sky-200',
    barClass: 'from-sky-400 to-cyan-300',
  },
  {
    title: 'Backend',
    description: 'Power forms, dashboards, user actions, and business logic with routes and server-side processing.',
    icon: Server,
    iconClass: 'rounded-2xl bg-violet-400/10 p-3 text-violet-200',
    barClass: 'from-violet-400 to-indigo-300',
  },
  {
    title: 'Databases',
    description: 'Persist content, track user changes, and make apps useful after refresh with structured data storage.',
    icon: Database,
    iconClass: 'rounded-2xl bg-cyan-400/10 p-3 text-cyan-200',
    barClass: 'from-cyan-400 to-sky-300',
  },
  {
    title: 'APIs',
    description: 'Connect frontend experiences to backend data using predictable routes and JSON responses.',
    icon: Workflow,
    iconClass: 'rounded-2xl bg-emerald-400/10 p-3 text-emerald-200',
    barClass: 'from-emerald-400 to-lime-300',
  },
  {
    title: 'Deployment',
    description: 'Ship work from your laptop to the public web so real users, clients, or instructors can access it.',
    icon: Rocket,
    iconClass: 'rounded-2xl bg-amber-400/10 p-3 text-amber-200',
    barClass: 'from-amber-400 to-orange-300',
  },
  {
    title: 'UI Design',
    description: 'Use hierarchy, typography, spacing, and motion to make products feel trustworthy and intentional.',
    icon: Paintbrush,
    iconClass: 'rounded-2xl bg-fuchsia-400/10 p-3 text-fuchsia-200',
    barClass: 'from-fuchsia-400 to-violet-300',
  },
];

const reasons = [
  {
    title: 'It blends creativity with problem solving',
    copy: 'Web development is one of the few fields where design, writing, logic, and systems thinking all show up in the same project.',
    icon: Paintbrush,
  },
  {
    title: 'It creates public, useful work quickly',
    copy: 'You can build something functional and share it online fast, which makes it ideal for portfolios, school projects, and startups.',
    icon: Rocket,
  },
  {
    title: 'It teaches the whole product pipeline',
    copy: 'Frontend, backend, APIs, data, and deployment work together. Learning the web helps you understand how digital products are actually built.',
    icon: Database,
  },
];
</script>
