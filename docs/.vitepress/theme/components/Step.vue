<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <li class="step-item">
    <h3 v-if="title" class="step-title">{{ title }}</h3>
    <div class="step-content">
      <slot />
    </div>
  </li>
</template>

<style scoped>
.step-item {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 1.5rem;
}
.step-item::before {
  counter-increment: step;
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 1.5rem;
  font-weight: bold;
}
.step-title {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.1em;
}
</style>
