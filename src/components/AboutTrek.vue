<template>
  <div class="about-trek-container">
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
    </div>

    <!-- Navigation dots with labels -->
    <div class="nav-dots">
      <div v-for="(section, index) in sections" 
           :key="index"
           class="dot-container"
           @click="setActiveSection(index)">
        <div class="dot"
             :class="{ 'active': activeSection === index }"
             :title="section.title">
        </div>
        <div class="dot-label">{{ section.title }}</div>
      </div>
    </div>

    <!-- Back button -->
    <div class="back-button" @click="goBack">
      &lt; Back to Home
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

    const setActiveSection = (index) => {
      activeSection.value = index
      console.log('Switching to section:', index)
    }

    const sections = [
      {
        title: "What is Trek?",
        content: "Trek is an innovative platform that brings together essential tools for the Sei Network ecosystem. Our mission is to provide a comprehensive suite of tools that enhance the user experience in navigating and analyzing blockchain data."
      },
      {
        title: "Telemeter",
        content: "Telemeter is our advanced token tracking platform designed specifically for the Sei Network. Features include:\n\n" +
                "• Real-time token tracking across wallets and exchanges\n" +
                "• Detailed liquidity pool analytics\n" +
                "• Customizable alerts for token movements\n" +
                "• Comprehensive historical data analysis\n\n" +
                "Perfect for traders and investors seeking deep insights into token dynamics."
      },
      {
        title: "Seiview",
        content: "Seiview serves as your window into the Sei Network, offering:\n\n" +
                "• Intuitive blockchain explorer functionality\n" +
                "• Real-time network statistics and health metrics\n" +
                "• Detailed token analytics and tracking\n" +
                "• User-friendly visualizations of complex blockchain data\n\n" +
                "Essential for developers, analysts, and blockchain enthusiasts."
      },
      {
        title: "Seimap",
        content: "Seimap provides a comprehensive visualization of the Sei ecosystem:\n\n" +
                "• Interactive ecosystem mapping\n" +
                "• Tokenomics visualization tools\n" +
                "• Project interconnection displays\n" +
                "• Community engagement features\n\n" +
                "Your guide to understanding the complete Sei Network landscape."
      }
    ]

    const goBack = () => {
      router.push('/')
    }

    return {
      activeSection,
      sections,
      goBack,
      setActiveSection
    }
  }
}
</script>

<style>
/* Global styles to ensure no white background */
:root, body {
  background: black !important;
}
</style>

<style scoped>
.about-trek-container {
  width: 100%;
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.content-container {
  position: relative;
  z-index: 1;
  background: transparent; /* Ensure transparency */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.section {
  position: absolute;
  width: 80%;
  max-width: 800px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all 0.5s ease;
  padding: 30px;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
  border: 2px solid cyan;
  border-radius: 10px;
}

.section.active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.nav-dots {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
  pointer-events: auto;
}

.dot-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 5px;
}

.dot-label {
  color: cyan;
  font-size: 0.8em;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  margin-right: 20px;
}

.dot-container:hover .dot-label {
  opacity: 1;
}

.dot {
  width: 12px;
  height: 12px;
  border: 2px solid cyan;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
}

.dot-container:hover .dot {
  border-color: gold;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
  transform: scale(1.2);
}

.dot.active {
  background: cyan;
  transform: scale(1.2);
}

.section h2 {
  color: cyan;
  font-family: 'Antonio', sans-serif;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.section-content {
  background: transparent;
  color: #fff;
  font-family: 'Antonio', sans-serif;
  font-size: 1.2em;
  line-height: 1.8;
  white-space: pre-wrap;
  text-align: left;
  padding: 20px;
}

.section-content {
  position: relative;
  padding: 20px;
  background: rgba(0, 255, 255, 0.05);
  border-radius: 5px;
}

.section:hover {
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  transform: translateY(-5px);
  transition: all 0.3s ease;
}

.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  padding: 15px 30px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  color: cyan;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  border-radius: 5px;
}

.back-button:hover {
  color: gold;
  border-color: gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}
</style> 