<template>
  <div class="relative min-h-screen overflow-hidden">
    <div class="pointer-events-none absolute inset-0 bg-grid bg-[size:32px_32px] opacity-30" />
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-gradient-to-b from-sky-400/10 via-transparent to-transparent" />
    <AppHeader />
    <main class="relative z-10">
      <slot />
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>
