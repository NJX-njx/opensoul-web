<template>
  <div class="steps-container">
    <ol>
      <slot />
    </ol>
  </div>
</template>

<style scoped>
.steps-container ol {
  counter-reset: step;
  list-style: none;
  padding: 0;
}
</style>
