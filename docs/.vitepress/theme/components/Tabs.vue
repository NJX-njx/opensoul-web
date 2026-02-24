<script setup lang="ts">
import { ref, provide, useSlots, onMounted } from 'vue'

const activeTab = ref(0)
const tabs = ref<string[]>([])

provide('tabs', {
  activeTab,
  registerTab: (title: string) => {
    tabs.value.push(title)
    return tabs.value.length - 1
  }
})
</script>

<template>
  <div class="tabs-container">
    <div class="tabs-header">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab-button"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div class="tabs-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.tabs-container {
  margin: 1rem 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}
.tabs-header {
  display: flex;
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  overflow-x: auto;
}
.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.tab-button:hover {
  color: var(--vp-c-brand);
}
.tab-button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg);
}
.tabs-content {
  padding: 1.5rem;
}
</style>
