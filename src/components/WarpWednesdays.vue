<template>
  <ClientOnly>
    <div class="warp-wednesdays-container" v-if="isReady">
      <!-- GB animation -->
      <div class="gb-container">
        <a href="https://dragonswap.app/swap?inputCurrency=SEI&outputCurrency=0xd78BE621436e69C81E4d0e9f29bE14C5EC51E6Ae" 
           target="_blank" 
           rel="noopener noreferrer">
          <img src="@/assets/gb.png" alt="GB" class="floating-gb" :class="`gb-direction-${gbDirection}`">
        </a>
      </div>
      
      <!-- Back button -->
      <div class="back-button" :class="{ 'back-button-small': isScrolled }" @click="goBack">
        &lt; Back to Home
      </div>
      
      <!-- Content container -->
      <div class="content-container">
        <div class="section">
          <h2>Warp Wednesdays</h2>
          <div class="section-content">
            <div v-for="(post, index) in blogPosts" 
                 :key="index"
                 class="blog-post">
              <h3>{{ post.title }}</h3>
              <div class="post-date">{{ post.date }}</div>
              <div class="dashboard-media">
                <video v-if="post.type === 'video'" 
                       controls 
                       class="dashboard-video">
                  <source :src="post.video" type="video/mp4">
                  Your browser does not support the video tag.
                </video>
                <img v-else 
                     :src="post.image" 
                     :alt="post.title">
              </div>
              <div class="post-content" v-html="post.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'WarpWednesdays',
  setup() {
    const router = useRouter()
    const isReady = ref(false)
    const gbDirection = ref(0)
    const isScrolled = ref(false)
    const blogPosts = ref([
      {
        title: "Announcing Warp Wednesdays!",
        date: "2024-11-27",
        content: "We're thrilled to announce a new chapter in our journey as the Warp Bois Discord evolves into the TREK Discord! Starting today, every Wednesday we'll be bringing you comprehensive updates on everything happening in our ecosystem. Warp Wednesdays will feature the latest TREK news, exciting community competitions, detailed Sei network analysis, NFT market insights, meme coin trends, and much more. Join us weekly as we explore the frontiers of the Sei ecosystem and build our community together. This is just the beginning of our mission to create the most engaging and informative platform for all things Sei!",
        image: require('@/assets/warpw1.jpeg'),
        type: 'image'
      },
      {
        title: "WARP BOIS Evolution: Introducing TREK",
        date: "2024-11-27",
        content: "Today marks an exciting evolution in our journey as we rebrand our Discord server from WARP BOIS to TREK. This change reflects the growth and expansion of our ecosystem, while honoring our roots. The WARP BOIS aren't going anywhere - they remain an integral part of TREK's future and identity. This rebranding better captures the full scope of what we've built together: from NFTs to DeFi, from community tools to market analytics. TREK represents our mission to explore new frontiers in the Sei ecosystem, with the WARP BOIS leading the charge. Join us as we embark on this next chapter of our adventure! <a href='https://discord.gg/K9vUgVxm3W' target='_blank' rel='noopener noreferrer' class='discord-link'>Come check out the Discord here!</a>",
        image: require('@/assets/IMG_5430.jpg'),
        type: 'image'
      },
      {
        title: "Tanker Bot Returns to Discord",
        date: "2024-11-27",
        content: "We're excited to announce that Tanker has returned to Discord with enhanced capabilities! Our beloved bot now tracks coin prices and NFT market data in real-time. Simply tag Tanker in your Discord server to access market analytics, price alerts, and trading volumes. Stay tuned for upcoming features including customizable alerts, trading pair analytics, and advanced NFT floor price tracking. Tanker is evolving to become your all-in-one Discord companion for the Sei ecosystem.",
        video: require('@/assets/tankerback.mp4'),
        type: 'video'
      },
      {
        title: "$GONAD Skyrockets Overnight!",
        date: "2024-11-27",
        content: "In an explosive turn of events, $GONAD has seen a massive green candle overnight, catching the attention of traders and enthusiasts across the Sei ecosystem as part of Meme Coin Madness. This unprecedented surge has solidified $GONAD's position as one of the most exciting meme coins in the space. While the exact catalyst was one major whale showing conviction, it's clear that the community's enthusiasm and the overall bullish sentiment in the Sei market have played significant roles. As always, we remind our community to trade responsibly and do their own research. Stay tuned for more updates on this developing story!",
        image: require('@/assets/green_candle.png'),
        type: 'image'
      },
      {
        title: "Sei Network Growth Dashboard",
        date: "2024-11-27",
        content: `Our latest network activity dashboard showcases Sei's remarkable growth trajectory. The metrics highlight substantial increases in active wallets, returning user engagement, and daily transaction volumes. This comprehensive view of network health indicates strong organic growth and user retention. As Sei continues to evolve, we'll be expanding these metrics to include more detailed analytics about DeFi activity, smart contract interactions, and cross-chain movements. <a href='https://flipsidecrypto.xyz/studio/dashboards/2eabf741-641e-4fe3-8b85-ddc1433818c0?beta' target='_blank' rel='noopener noreferrer' style='color: #00ffff !important; text-decoration: none; font-weight: bold;'>Come check out the dashboard here!</a>`,
        image: require('@/assets/ww1.png'),
        type: 'image'
      },
      {
        title: "Memecoin Madness Trading Metrics",
        date: "2024-11-27",
        content: "Since the launch of Memecoin Madness this week, we've seen unprecedented trading activity across Sei-based meme tokens. This dashboard tracks the explosive growth in trade volume, number of unique traders, and transaction frequency. The data reveals how the Sei ecosystem is rapidly becoming a hub for community-driven token trading. We'll continue monitoring these metrics as the meme economy expands on Sei. <a href='https://flipsidecrypto.xyz/studio/dashboards/352d49af-b37d-4071-90cf-4eac588c5968?beta' target='_blank' rel='noopener noreferrer' class='discord-link'>Come check out the dashboard here!</a>",
        image: require('@/assets/ww2.png'),
        type: 'image'
      }
    ])

    const startGBAnimation = () => {
      gbDirection.value = (gbDirection.value + 1) % 4
    }

    const goBack = () => {
      router.push('/')
    }

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }

    onMounted(() => {
      isReady.value = true
      startGBAnimation()
      const gb = document.querySelector('.floating-gb')
      if (gb) {
        gb.addEventListener('animationend', startGBAnimation)
      }
      window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      isReady,
      gbDirection,
      blogPosts,
      startGBAnimation,
      goBack,
      isScrolled
    }
  }
}
</script>

<style>
.warp-wednesdays-container {
  width: 100%;
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow-y: auto;
  padding-bottom: 50px;
  pointer-events: auto;
}

.content-container {
  padding-top: 120px;
}

.section {
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: #ff9c00;
  border-radius: 40px;
  z-index: 2;
}

.section h2 {
  color: black;
  font-family: 'Antonio', sans-serif;
  font-size: 2.5em;
  text-align: right;
  text-transform: uppercase;
  letter-spacing: 2px;
  padding-right: 20px;
}

.blog-post {
  background: rgba(0, 0, 0, 0.7);
  margin: 20px 0;
  padding: 20px;
  border-radius: 20px;
  color: white;
  transition: transform 0.3s ease;
  overflow: hidden;
}

.blog-post:hover {
  transform: translateY(-5px);
}

.blog-post h3 {
  color: #ff9c00;
  font-family: 'Antonio', sans-serif;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.post-date {
  color: #9999ff;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.post-content {
  font-family: 'Antonio', sans-serif;
  font-size: 1.2em;
  line-height: 1.8;
}

.back-button {
  position: fixed;
  top: 30px;
  left: 30px;
  width: 200px;
  height: 80px;
  background: #ff9c00;
  border: none;
  border-radius: 40px;
  color: black;
  font-size: 1.2em;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
  transition: all 0.3s ease;
}

.back-button-small {
  transform: scale(0.5);
  transform-origin: top left;
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

.dashboard-media {
  width: 100%;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  position: relative;
}

.dashboard-video {
  width: 90%;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(255, 156, 0, 0.3);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  display: block;
  margin: 0 auto;
}

.dashboard-media img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(255, 156, 0, 0.3);
  object-fit: contain;
  max-height: 500px;
}

html {
  scroll-behavior: smooth;
}

.gb-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: auto;
}

.floating-gb {
  position: absolute;
  width: 100px;
  height: auto;
  animation: floatGB 20s linear infinite;
  opacity: 0.8;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.floating-gb:hover {
  opacity: 1;
}

@keyframes floatGB {
  from {
    transform: translate(100vw, -100px) rotate(0deg);
  }
  to {
    transform: translate(-100px, 100vh) rotate(720deg);
  }
}

.discord-link {
  color: #00ffff !important;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}

.discord-link:hover {
  color: #ff9c00 !important;
  text-decoration: underline;
  text-shadow: 0 0 5px rgba(255, 156, 0, 0.5);
}

.discord-link:visited {
  color: #ff00ff !important;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}

.post-content a {
  color: #00ffff !important;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
}

.post-content a:hover {
  color: #ff9c00 !important;
  text-decoration: underline;
}

.post-content a:visited {
  color: #ff00ff !important;
}

/* Remove scoped to allow styles to affect dynamic content */
.warp-wednesdays-container .post-content a,
.warp-wednesdays-container .discord-link {
  color: #00ffff !important;
  text-decoration: none !important;
  font-weight: bold !important;
  transition: color 0.3s ease !important;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8) !important;
}

.warp-wednesdays-container .post-content a:hover,
.warp-wednesdays-container .discord-link:hover {
  color: #ff9c00 !important;
  text-decoration: underline !important;
}

.warp-wednesdays-container .post-content a:visited,
.warp-wednesdays-container .discord-link:visited {
  color: #ff00ff !important;
}

/* Add a global style for these specific links */
:deep(a[href*="flipsidecrypto.xyz"]),
:deep(a[href*="discord.gg"]) {
  color: #00ffff !important;
  text-decoration: none !important;
  font-weight: bold !important;
}

:deep(a[href*="flipsidecrypto.xyz"]:visited),
:deep(a[href*="discord.gg"]:visited) {
  color: #ff00ff !important;
}
</style> 