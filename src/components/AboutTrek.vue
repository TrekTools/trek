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
  padding: 40px;
  background: #9999ff; /* LCARS blue */
  border: none;
  border-radius: 40px;
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
  color: #9999ff; /* LCARS blue */
  font-size: 1em;
  opacity: 0;
  transition: opacity 0.3s ease;
  white-space: nowrap;
  margin-right: 20px;
  font-family: 'Antonio', sans-serif;
}

.dot-container:hover .dot-label {
  opacity: 1;
}

.dot {
  width: 12px;
  height: 12px;
  background: #ff9966; /* LCARS salmon */
  border: none;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.dot-container:hover .dot {
  background: #ff9c00; /* LCARS orange */
  transform: scale(1.2);
}

.dot.active {
  background: #cc99cc; /* LCARS purple */
  transform: scale(1.2);
}

.section h2 {
  color: black; /* LCARS uses dark text on light backgrounds */
  font-family: 'Antonio', sans-serif;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: right; /* LCARS often right-aligns text */
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-right: 20px;
}

.section-content {
  background: inherit;
  color: black;
  font-family: 'Antonio', sans-serif;
  font-size: 1.2em;
  line-height: 1.8;
  white-space: pre-wrap;
  text-align: left;
  padding: 30px;
  border-radius: 20px;
  margin-top: 20px;
  position: relative;
}

.section-content ul {
  color: black;
}

.section-content a {
  color: black;
  text-decoration: underline;
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
  width: 200px;
  height: 80px;
  background: #ff9c00; /* LCARS orange */
  border: none;
  border-radius: 40px;
  color: black;
  font-size: 1.2em;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
}

.back-button::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 100%;
  background: inherit;
  border-radius: 40px 0 0 40px;
  opacity: 0.7;
}

.back-button:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}

/* Section color variations */
.section:nth-child(1) { 
  background: #ff9c00; /* Orange */
  .section-content {
    background: #ff9c00;
  }
} 

.section:nth-child(2) { 
  background: #cc99cc; /* Purple */
  .section-content {
    background: #cc99cc;
  }
}

.section:nth-child(3) { 
  background: #9999ff; /* Blue */
  .section-content {
    background: #9999ff;
  }
}

.section:nth-child(4) { 
  background: #ff9966; /* Salmon */
  .section-content {
    background: #ff9966;
  }
}

.section:hover {
  filter: brightness(1.05);
  transform: translateY(-5px);
}
</style> 