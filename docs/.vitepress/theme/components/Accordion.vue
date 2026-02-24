<script setup lang="ts">
defineProps<{ title?: string }>()
</script>

<template>
  <details class="details custom-block">
    <summary>{{ title }}</summary>
    <div class="details-content">
      <slot />
    </div>
  </details>
</template>
