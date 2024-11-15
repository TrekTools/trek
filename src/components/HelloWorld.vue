<template>
  <div class="background-container">
    <div class="text-background">TREK</div>
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
</style>
