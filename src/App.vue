<template>
  <div class="background-container">
    <div class="lines-container">
      <!-- Create multiple lines -->
      <div v-for="n in 20" :key="n" 
           class="line"
           :style="{ 
             animationDelay: `${n * 0.2}s`,
             transform: `rotate(${n * 18}deg)`,
             width: `${1 + Math.random() * 20}px`,
             opacity: `${0.1 + Math.random() * 0.15}`
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

.lines-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;
}

.line {
  position: absolute;
  left: calc(50% - 1px);
  height: 100vh;
  background: cyan;
  transform-origin: top;
  animation: lineMove 3s ease-in-out infinite;
}

@keyframes lineMove {
  0% {
    transform: rotate(var(--rotation)) translateY(-50vh);
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    transform: rotate(var(--rotation)) translateY(50vh);
    opacity: 0.1;
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
