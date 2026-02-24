<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref(null)
let animationFrameId = null

onMounted(() => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  let width, height, stars

  const init = () => {
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = width
    canvas.height = height
    
    // Create 150 stars with random properties matching the design
    stars = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.0 + 0.5, // 0.5 - 1.5
      opacity: Math.random() * 0.7 + 0.1, // 0.1 - 0.8
      speedX: (Math.random() - 0.5) * 0.5, // Slow random movement
      speedY: (Math.random() - 0.5) * 0.5,
      pulseSpeed: (Math.random() * 0.02) + 0.005,
      pulseDir: 1
    }))
  }

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    
    // Draw background (black is handled by CSS, but we can clear to transparent)
    // ctx.fillStyle = '#000000'
    // ctx.fillRect(0, 0, width, height)

    stars.forEach(star => {
      // Update position
      star.x += star.speedX
      star.y += star.speedY

      // Wrap around screen
      if (star.x < 0) star.x = width
      if (star.x > width) star.x = 0
      if (star.y < 0) star.y = height
      if (star.y > height) star.y = 0

      // Pulse opacity
      star.opacity += star.pulseSpeed * star.pulseDir
      if (star.opacity > 0.8) {
        star.opacity = 0.8
        star.pulseDir = -1
      } else if (star.opacity < 0.1) {
        star.opacity = 0.1
        star.pulseDir = 1
      }

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
      ctx.fill()
    })

    animationFrameId = requestAnimationFrame(draw)
  }

  const handleResize = () => {
    init()
  }

  init()
  draw()

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', () => {})
})
</script>

<template>
  <canvas ref="canvasRef" class="star-background"></canvas>
</template>

<style scoped>
.star-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #000000;
  pointer-events: none;
}
</style>
