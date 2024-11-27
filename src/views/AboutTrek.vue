<template>
  <div class="about-trek-container">
    <!-- Background lines similar to home page -->
    <div class="lines-container">
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

    <!-- Back button -->
    <div class="back-button" @click="goBack">
      &lt; Back to Home
    </div>

    <!-- Content sections -->
    <div class="content-container">
      <div class="section" v-for="(section, index) in sections" 
           :key="index"
           :class="{ 'active': activeSection === index }">
        <h2>{{ section.title }}</h2>
        <div class="section-content">
          {{ section.content }}
        </div>
      </div>

      <!-- Navigation dots -->
      <div class="nav-dots">
        <div v-for="(section, index) in sections" 
             :key="index"
             class="dot"
             :class="{ 'active': activeSection === index }"
             @click="activeSection = index">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AboutTrek',
  setup() {
    const router = useRouter()
    const activeSection = ref(0)

    const sections = [
      {
        title: "What is Trek?",
        content: "Trek is a revolutionary platform that combines blockchain technology with innovative tools and services. Our mission is to create a seamless experience for users navigating the crypto space."
      },
      {
        title: "Tokenomics",
        content: "The Trek ecosystem is powered by $WARP, our native token. With a focus on sustainable tokenomics, we've implemented a balanced distribution model that rewards long-term holders while maintaining market stability."
      },
      {
        title: "Roadmap",
        content: "Our journey is mapped out with clear milestones. From platform development to community expansion, each step is carefully planned to ensure sustainable growth and value creation for our community."
      },
      {
        title: "Team",
        content: "Behind Trek is a team of passionate developers, designers, and blockchain experts committed to pushing the boundaries of what's possible in the crypto space."
      }
    ]

    const goBack = () => {
      router.push('/')
    }

    return {
      activeSection,
      sections,
      goBack
    }
  }
}
</script>

<style scoped>
.about-trek-container {
  width: 100%;
  height: 100vh;
  background: #000;
  position: relative;
  overflow: hidden;
}

.lines-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.line {
  position: absolute;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  transform-origin: bottom;
  animation: fade-in 10s linear infinite;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background: #fff;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #000;
  color: #fff;
}

.content-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.section {
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s ease;
}

.section.active {
  opacity: 1;
}

.section-content {
  padding: 20px;
  font-size: 1.2em;
  line-height: 1.5;
}

.nav-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background: #000;
}
</style> 