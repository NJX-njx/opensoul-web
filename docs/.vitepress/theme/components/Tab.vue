<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'

const props = defineProps<{ title: string }>()
const { activeTab, registerTab } = inject('tabs') as any
const index = ref(-1)

onMounted(() => {
  index.value = registerTab(props.title)
})
</script>

<template>
  <div v-show="activeTab === index" class="tab-pane">
    <slot />
  </div>
</template>
