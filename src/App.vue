<template>
  <div class="background-container">
    <div class="stars-container">
      <!-- Create multiple stars -->
      <div v-for="n in 200" :key="n" 
           class="star"
           :style="{ 
             left: `${Math.random() * 100}%`,
             top: `${Math.random() * 100}%`,
             animationDelay: `${Math.random() * 3}s`,
             width: `${1 + Math.random() * 2}px`,
             height: `${1 + Math.random() * 2}px`,
             animationDuration: `${1 + Math.random() * 3}s`
           }">
      </div>
    </div>
    <div class="text-background">TREK</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Antonio', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

.background-container {
  background-color: black;
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.star {
  position: absolute;
  background: cyan;
  border-radius: 50%;
  box-shadow: 0 0 10px cyan, 0 0 20px cyan;
  animation: twinkle linear infinite;
}

@keyframes twinkle {
  0% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
}

.text-background {
  position: fixed;
  font-size: 20vw;
  font-family: 'Antonio', sans-serif;
  font-weight: 700;
  color: rgba(0, 255, 255, 0.03);
  white-space: nowrap;
  z-index: 2;
  pointer-events: none;
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
</style>
