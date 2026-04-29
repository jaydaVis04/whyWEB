<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    <Card v-for="index in 6" :key="index" class="space-y-4">
      <Skeleton class="h-4 w-24" />
      <Skeleton class="h-10 w-2/3" />
      <Skeleton class="h-24 w-full" />
      <div class="flex gap-2">
        <Skeleton class="h-8 w-20 rounded-full" />
        <Skeleton class="h-8 w-24 rounded-full" />
      </div>
      <Skeleton class="h-24 w-full" />
    </Card>
  </div>
</template>

<script setup>
import Card from '@/components/ui/Card.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
</script>
