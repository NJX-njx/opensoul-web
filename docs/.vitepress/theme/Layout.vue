<script setup>
import DefaultTheme from 'vitepress/theme'
import StarBackground from './components/StarBackground.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <StarBackground />
    </template>
  </Layout>
</template>
