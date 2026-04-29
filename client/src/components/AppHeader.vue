<template>
  <header class="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
    <div class="section-shell flex h-20 items-center justify-between">
      <RouterLink to="/" class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-300 to-violet-400 text-sm font-extrabold text-slate-950 shadow-glow">
          wW
        </div>
        <div>
          <p class="font-display text-lg font-semibold text-white">whyWEB</p>
          <p class="text-xs text-slate-400">Learn what powers modern web products.</p>
        </div>
      </RouterLink>

      <nav class="hidden items-center gap-3 md:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          active-class="bg-white/10 text-white"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <RouterLink
        to="/dashboard"
        class="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-200"
      >
        Open Tracker
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Dashboard', to: '/dashboard' },
];
</script>
