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
    
    <!-- Four flying boxes -->
    <div class="box box-left">1</div>
    <div class="box box-right">2</div>
    <div class="box box-top">3</div>
    <div class="box box-bottom">4</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld'
}
</script>

<style>
/* Import Antonio font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@700&display=swap');
</style>

<style scoped>
.background-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: #000; /* Black background to make cyan pop */
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-background {
  font-family: 'Antonio', sans-serif;
  font-size: 20vw; /* Responsive font size */
  font-weight: 700;
  color: cyan;
  text-align: center;
  letter-spacing: 0.1em;
  animation: glow 2s ease-in-out infinite alternate;
  z-index: 2;
  position: relative;
}

@keyframes glow {
  from {
    text-shadow: 0 0 10px cyan,
                 0 0 20px cyan,
                 0 0 30px cyan;
  }
  to {
    text-shadow: 0 0 20px cyan,
                 0 0 30px cyan,
                 0 0 40px cyan,
                 0 0 50px cyan;
  }
}

.lines-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.line {
  position: absolute;
  width: 3px;
  height: 100%;
  left: 50%;
  background: cyan;
  opacity: 0.2;
  transform-origin: 50% 50%;
  animation: moveLine 4s infinite;
}

@keyframes moveLine {
  0% {
    transform-origin: 50% 50%;
    scale: 2;
    opacity: 0;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    transform-origin: 50% 50%;
    scale: 0;
    opacity: 0;
  }
}

.box {
  position: fixed;
  width: 300px;
  height: 300px;
  background: rgba(0, 255, 255, 0.2);
  border: 2px solid cyan;
  display: flex;
  justify-content: center;
  align-items: center;
  color: cyan;
  font-family: 'Antonio', sans-serif;
  font-size: 6em;
  animation: 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards;
  opacity: 0;
}

.box-left {
  left: -350px;
  top: calc(50% - 350px);
  animation-name: flyInLeft;
}

.box-right {
  right: -350px;
  top: calc(50% + 50px);
  animation-name: flyInRight;
}

.box-top {
  top: -350px;
  left: calc(50% + 50px);
  animation-name: flyInTop;
}

.box-bottom {
  bottom: -350px;
  left: calc(50% - 350px);
  animation-name: flyInBottom;
}

@keyframes flyInLeft {
  from {
    transform: translateX(0) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: translateX(calc(25vw + 50px)) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInRight {
  from {
    transform: translateX(0) rotate(180deg);
    opacity: 0;
  }
  to {
    transform: translateX(calc(-25vw - 50px)) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInTop {
  from {
    transform: translateY(0) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: translateY(calc(25vh + 50px)) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInBottom {
  from {
    transform: translateY(0) rotate(180deg);
    opacity: 0;
  }
  to {
    transform: translateY(calc(-25vh - 50px)) rotate(0deg);
    opacity: 1;
  }
}
</style>
