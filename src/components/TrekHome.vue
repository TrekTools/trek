<template>
  <div class="background-container">
    <div class="stars-container">
      <div v-for="star in stars" :key="star.id" 
           class="star"
           :class="star.size"
           :style="{
             left: star.left,
             top: star.top,
             animationDelay: star.delay
           }">
      </div>
    </div>
    <div class="voyager-container">
      <div class="trail-container">
        <div class="voyager-trail"></div>
      </div>
      <img :src="voyagerImage" alt="Voyager" class="voyager">
      
      <div class="trail-container-2">
        <div class="voyager-trail-2"></div>
      </div>
      <img :src="voyagerImage2" alt="Voyager 2" class="voyager-2">
    </div>
    <!-- Boxes first in DOM order -->
    <div class="boxes-container">
      <div class="box box-left" 
           @click="toggleDiscover"
           :class="{ 'discover-fly-away': isLeaving }">
        Discover
      </div>
      <div class="box box-right" 
           @click="toggleNFTs"
           :class="{ 'box-fly-away': isLeaving }">
        <div class="nft-background"></div>
        <span class="box-text">NFTs</span>
      </div>
      <div class="box box-top" 
           @click="toggleMenu"
           :class="{ 'box-fly-away': isLeaving }">
        Quick Tools
      </div>
      <div class="box box-bottom" 
           @click="toggleWarp"
           :class="{ 'box-fly-away': isLeaving }">
        $WARP
      </div>
    </div>
    <!-- Text last, so it's on top -->
    <div class="text-background">TREK</div>
    
    <!-- Quick Menu Items -->
    <div class="quick-menu" :class="{ 'menu-active': menuOpen }">
      <div class="menu-item" @click="openLink('https://tlmtr.xyz')">Telemeter</div>
      <div class="menu-item" @click="openLink('https://seimap.xyz')">Seimap</div>
      <div class="menu-item" @click="openLink('https://seiview.xyz')">Seiview</div>
    </div>

    <!-- NFT Gallery with error handling -->
    <div class="nft-gallery" :class="{ 'gallery-active': nftOpen }">
      <div class="nft-item" @click="openLink('https://pallet.exchange/collection/trek-access-chit')">
        <img 
          src="@/assets/23.png" 
          alt="NFT 23"
          @error="handleImageError"
        >
        <span class="tooltip">TREK ACCESS CHIT</span>
      </div>
      <div class="nft-item" @click="openLink('https://pallet.exchange/collection/warp-bois')">
        <img 
          src="@/assets/35.gif" 
          alt="NFT 35"
          @error="handleImageError"
        >
        <span class="tooltip">WARP BOIS</span>
      </div>
    </div>

    <!-- Warp Gallery -->
    <div class="warp-gallery" :class="{ 'warp-active': warpOpen }">
      <div class="warp-item" @click="openLink('https://dexscreener.com/seiv2/0x921FaF220dcaf3E32FCd474d12C3892040DDe623')">
        <img 
          src="@/assets/dxsc.png" 
          alt="DXSC"
          @error="handleImageError"
        >
        <span class="tooltip">DexScreener</span>
      </div>
      <div class="warp-item" @click="openLink('https://dragonswap.app/swap?inputCurrency=SEI&outputCurrency=0x921FaF220dcaf3E32FCd474d12C3892040DDe623')">
        <img 
          src="@/assets/dsw.png" 
          alt="DSW"
          @error="handleImageError"
        >
        <span class="tooltip">DragonSwap</span>
      </div>
    </div>

    <!-- Discover dropdown menu -->
    <div class="discover-menu" :class="{ 'menu-active': discoverOpen }">
      <div class="menu-item" @click="goToAboutTrek">About Trek</div>
      <div class="menu-item" @click="goToWarpWednesdays">Warp Wednesdays</div>
    </div>

    <!-- Warbird formation -->
    <div class="warbird-formation">
      <div v-for="i in 4" :key="i" 
           :class="`warbird-container warbird-${i}`">
        <div class="warbird-trail"></div>
        <img :src="require('@/assets/rw1.png')" alt="Romulan Warbird" class="warbird">
      </div>
    </div>
  </div>
  <div class="social-links">
    <a href="https://twitter.com/web3trek" target="_blank" rel="noopener noreferrer" class="social-button">
      <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    </a>
    <a href="https://discord.gg/K9vUgVxm3W" target="_blank" rel="noopener noreferrer" class="social-button">
      <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </a>
  </div>
  <div class="lcars-footer">
    <div class="lcars-corner"></div>
    <div class="lcars-text-container">
      <div class="lcars-title">TREK.TOOLS</div>
      <div class="lcars-id">02-262000</div>
    </div>
    <div class="lcars-data">
      <div class="data-row" v-for="row in 3" :key="row">
        <span v-for="col in 10" :key="col" 
              :class="{ 'number-blink': shouldBlink(row, col) }">
          {{ getRandomNumber(row, col) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import voyagerImage from '@/assets/vgr1.png'
import voyagerImage2 from '@/assets/vgr2.png'
import warbirdImage from '@/assets/rw1.png'

export default {
  name: 'TrekHome',
  data() {
    return {
      discoverOpen: false,
      menuOpen: false,
      nftOpen: false,
      warpOpen: false,
      isLeaving: false,
      baseNumbers: [
        [101, 7109, 1966, 36, 880, 1701, 2364, 74656, 47634, 98454],
        [102, 6102, 1987, 44, 51, 1864, 4523, 85647, 36454, 12654],
        [103, 714, 1993, 954, 4.4, 2893, 7453, 96534, 25654, 76543]
      ],
      animationInterval: null,
      stars: [],
      voyagerImage,
      voyagerImage2,
      warbirdImage
    }
  },
  methods: {
    toggleDiscover() {
      this.discoverOpen = !this.discoverOpen;
      // Close other menus
      this.menuOpen = false;
      this.nftOpen = false;
      this.warpOpen = false;
    },
    toggleNFTs() {
      this.nftOpen = !this.nftOpen;
      // Close other menus
      this.menuOpen = false;
      this.discoverOpen = false;
      this.warpOpen = false;
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      // Close other menus
      this.discoverOpen = false;
      this.nftOpen = false;
      this.warpOpen = false;
    },
    toggleWarp() {
      this.warpOpen = !this.warpOpen;
      // Close other menus
      this.menuOpen = false;
      this.discoverOpen = false;
      this.nftOpen = false;
    },
    goToAboutTrek() {
      this.isLeaving = true;
      this.discoverOpen = false; // Close menu before navigating
      setTimeout(() => {
        this.$router.push('/about-trek');
      }, 500);
    },
    goToWarpWednesdays() {
      this.isLeaving = true;
      this.discoverOpen = false; // Close menu before navigating
      setTimeout(() => {
        this.$router.push('/warp-wednesdays');
      }, 500);
    },
    openLink(url) {
      window.open(url, '_blank');
    },
    handleImageError(event) {
      event.target.src = '@/assets/placeholder.png';
    },
    getRandomNumber(row, col) {
      return Math.random() < 0.4 ? Math.floor(Math.random() * 9999) : this.baseNumbers[row-1][col-1]
    },
    shouldBlink(row, col) {
      return Math.random() < 0.4 && Date.now() % (row * col * 500) < 250
    },
    getStarClass() {
      // Distribute star sizes with more small stars
      return Math.random() < 0.7 ? 'small' : 
             Math.random() < 0.9 ? 'medium' : 'large'
    },
    getStarStyle() {
      return {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `-${Math.random() * 3000}s` // Very long random delay
      }
    },
    createStars() {
      const starContainer = this.$refs.starsContainer
      if (!starContainer) return
      
      const numberOfStars = 100
      
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        
        // Random size class
        const sizeClass = Math.random() < 0.7 ? 'small' : 
                         Math.random() < 0.9 ? 'medium' : 'large'
        star.classList.add(sizeClass)
        
        // Position
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3000}s`
        
        starContainer.appendChild(star)
      }
    }
  },
  created() {
    this.animationInterval = setInterval(() => {
      this.$forceUpdate()
    }, 50)
    this.stars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      size: Math.random() < 0.7 ? 'small' : Math.random() < 0.9 ? 'medium' : 'large',
      left: `${50 + (Math.random() - 0.5) * 100}%`,
      top: `${50 + (Math.random() - 0.5) * 100}%`,
      delay: `-${Math.random() * 400}s`
    }))
  },
  beforeUnmount() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
    }
  },
  mounted() {
    this.createStars()
  }
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
  z-index: 1;
}

.text-background {
  font-family: 'Antonio', sans-serif;
  font-size: 20vw;
  font-weight: 700;
  text-align: center;
  letter-spacing: 0.1em;
  z-index: 20;
  position: relative;
  animation: textColorRotate 30s ease-in-out infinite;
  text-shadow: 0 0 20px currentColor;
  opacity: 0.9;
  margin-top: 100px;
}

@keyframes textColorRotate {
  0% {
    color: rgb(8, 193, 226);
  }
  16% {
    color: rgba(128, 0, 128, 1);
  }
  33% {
    color: rgb(230, 200, 35);
  }
  50% {
    color: rgba(255, 0, 0, 1);
  }
  66% {
    color: rgb(230, 200, 35);
  }
  84% {
    color: rgba(128, 0, 128, 1);
  }
  100% {
    color: rgb(8, 193, 226);
  }
}

.boxes-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
  padding-bottom: 150px; /* Add space for the footer */
}

.box {
  position: fixed;
  width: 200px;
  height: 80px;
  background: #ff9c00;
  border: none;
  border-radius: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: black;
  font-family: 'Antonio', sans-serif;
  font-size: 1.8em;
  opacity: 0.9;
  cursor: pointer;
  pointer-events: auto;
  z-index: 5;
  padding-right: 30px;
  transition: all 0.3s ease;
  top: -100px;
}

.box:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(255, 156, 0, 0.3);
}

.box::before {
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

.box-left {
  background: #ff9c00;
  left: calc(20% - 100px);
  animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.box-right {
  background: #cc99cc;
  left: calc(40% - 100px);
  animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s forwards;
}

.box-top {
  background: #9999ff;
  left: calc(60% - 100px);
  animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s forwards;
}

.box-bottom {
  background: #ff9966;
  left: calc(80% - 100px);
  animation: slideInFromTop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s forwards;
}

@keyframes slideInFromTop {
  0% {
    transform: translateY(0);
    opacity: 0;
  }
  100% {
    transform: translateY(150px);
    opacity: 1;
  }
}

.quick-menu {
  position: fixed;
  top: 140px;
  left: calc(60% - 80px);
  background: #9999ff;
  border-radius: 0 0 40px 40px;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(-20px);
  width: 160px;
  pointer-events: none; /* Disable interactions when closed */
}

.menu-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto; /* Enable interactions when open */
}

.menu-item {
  color: black;
  font-family: 'Antonio', sans-serif;
  font-size: 24px;
  margin: 20px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: right;
}

.menu-item:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.menu-active .menu-item {
  opacity: 1;
  transform: translateX(0);
}

.menu-active .menu-item:nth-child(1) {
  transition: all 0.3s ease 0.1s;
}

.menu-active .menu-item:nth-child(2) {
  transition: all 0.3s ease 0.2s;
}

.menu-active .menu-item:nth-child(3) {
  transition: all 0.3s ease 0.3s;
}

.nft-gallery {
  position: fixed;
  top: 150px;
  left: calc(40% - 80px);
  background: #cc99cc;
  border-radius: 0 0 40px 40px;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(-20px);
  width: 160px;
  pointer-events: none; /* Disable interactions when closed */
}

.gallery-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto; /* Enable interactions when open */
}

.nft-item {
  width: 120px;
  height: 120px;
  border: none;
  overflow: hidden;
  background: #cc99cc; /* LCARS purple */
  border-radius: 20px;
  position: relative;
  padding: 5px;
  margin: 10px auto;
}

.nft-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 100%;
  background: inherit;
  opacity: 0.7;
  border-radius: 20px 0 0 20px;
}

.nft-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 15px;
}

.warp-gallery {
  position: fixed;
  top: 150px;
  left: calc(80% - 80px);
  background: #ff9966;
  border-radius: 0 0 40px 40px;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(-20px);
  width: 160px;
}

.warp-active {
  opacity: 1;
  transform: translateY(0);
}

.warp-item {
  width: 120px;
  height: 120px;
  border: none;
  overflow: hidden;
  background: #ff9966; /* LCARS salmon */
  border-radius: 20px;
  position: relative;
  padding: 5px;
  margin: 10px auto;
}

.warp-item::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 100%;
  background: inherit;
  opacity: 0.7;
  border-radius: 0 20px 20px 0;
}

.warp-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 15px;
}

.warp-active .warp-item {
  opacity: 1;
  transform: translateY(0);
}

.warp-active .warp-item:nth-child(1) {
  transition: all 0.3s ease 0.1s;
}

.warp-active .warp-item:nth-child(2) {
  transition: all 0.3s ease 0.2s;
}

.warp-item:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
  box-shadow: 0 0 30px rgba(153, 153, 255, 0.3);
}

.nft-item, .warp-item {
  position: relative;
}

.tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff9c00; /* LCARS orange */
  color: black;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  border: none;
  font-family: 'Antonio', sans-serif;
  z-index: 100;
}

.tooltip::before {
  content: '';
  position: absolute;
  left: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 20px;
  background: inherit;
  border-radius: 10px 0 0 10px;
  opacity: 0.7;
}

.nft-item:hover .tooltip,
.warp-item:hover .tooltip {
  opacity: 1;
  top: -45px;
  background: #9999ff; /* LCARS blue on hover */
}

.nft-item:hover,
.warp-item:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
  box-shadow: 0 0 30px rgba(153, 153, 255, 0.3);
}

.box-fly-away {
  animation: boxFlyAway 1s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

.discover-fly-away {
  animation: discoverFlyAway 1s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}

@keyframes boxFlyAway {
  0% {
    transform: translateY(150px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

@keyframes discoverFlyAway {
  0% {
    transform: translateY(150px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

.discover-menu {
  position: fixed;
  top: 150px;
  left: calc(20% - 80px);
  width: 160px;
  background: #ff9c00;
  border-radius: 0 0 40px 40px;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

.menu-active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.menu-item {
  color: black;
  font-family: 'Antonio', sans-serif;
  font-size: 1.2em;
  text-align: right;
  padding: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px 0;
}

.menu-item:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

/* Animation for leaving state */
.discover-fly-away {
  animation: flyAway 0.5s ease forwards;
}

@keyframes flyAway {
  to {
    transform: translateY(-100vh);
    opacity: 0;
  }
}

.social-links {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 15px;
  z-index: 100;
}

.social-button {
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid #9999ff; /* LCARS blue */
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12px;
}

.social-button:hover {
  transform: scale(1.1);
  border-color: cyan;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
}

.social-icon {
  width: 24px;
  height: 24px;
  color: white;
}

.lcars-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  z-index: 100;
}

.lcars-corner {
  width: 120px;
  height: 120px;
  background: #cc99cc; /* LCARS purple */
  border-radius: 0 120px 0 0;
}

.lcars-text-container {
  background: #cc99cc;
  padding: 10px 20px;
  margin-bottom: 20px;
}

.lcars-title {
  font-family: 'Antonio', sans-serif;
  font-size: 1.5em;
  color: black;
  text-transform: uppercase;
}

.lcars-id {
  font-family: 'Antonio', sans-serif;
  font-size: 1.2em;
  color: black;
}

.lcars-data {
  background: black;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-family: 'Antonio', sans-serif;
  color: #ff9c00; /* LCARS orange */
}

.data-row {
  display: flex;
  gap: 20px;
  font-size: 0.9em;
  line-height: 1.4;
}

.data-row span {
  min-width: 40px;
  text-align: right;
  transition: color 0.3s ease;
}

/* Animation for blinking numbers */
.number-blink {
  animation: numberChange 0.5s ease;
  color: #ff3333;
}

@keyframes numberChange {
  0% {
    color: #ff9c00;
  }
  50% {
    color: #ff3333;
  }
  100% {
    color: #ff9c00;
  }
}

.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  opacity: 0.5;
  animation: starTwinkle 4s ease-in-out infinite, 
             starDrift 400s linear infinite;
}

.star.small {
  width: 1px;
  height: 1px;
  animation: starTwinkle 4s ease-in-out infinite,
             starDrift 250s linear infinite;
}

.star.medium {
  width: 2px;
  height: 2px;
  animation: starTwinkle 4s ease-in-out infinite,
             starDrift 200s linear infinite;
}

.star.large {
  width: 3px;
  height: 3px;
  animation: starTwinkle 4s ease-in-out infinite,
             starDrift 150s linear infinite;
}

@keyframes starTwinkle {
  0% { opacity: 0.2; }
  50% { opacity: 0.8; }
  100% { opacity: 0.2; }
}

@keyframes starDrift {
  from {
    transform: translate(-50%, -50%) scale(0.5);
  }
  to {
    transform: translate(-50%, -50%) scale(1.5);
  }
}

.voyager-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 2;
}

.voyager {
  position: absolute;
  width: 100px;
  height: auto;
  opacity: 0.9;
  animation: voyagerFlight 60s linear infinite;
  z-index: 3;
}

.trail-container {
  position: absolute;
  left: -200px; /* Move trail container left */
  z-index: 2;
  animation: voyagerFlight 60s linear infinite;
}

.voyager-trail {
  position: absolute;
  width: 200px;
  height: 4px;
  background: linear-gradient(
    to right,
    rgba(0, 149, 255, 0),
    rgba(0, 149, 255, 0.8),
    rgba(70, 180, 255, 0.9)
  );
  filter: blur(3px);
  transform: translate(40px, -76px) rotate(25deg);
  box-shadow: 
    0 0 10px rgba(0, 149, 255, 0.5),
    0 0 20px rgba(0, 149, 255, 0.3);
}

@keyframes voyagerFlight {
  from {
    transform: translate(-100px, 200px) rotate(15deg);
  }
  to {
    transform: translate(calc(100vw + 100px), calc(100vh + 200px)) rotate(15deg);
  }
}

.voyager-2 {
  position: absolute;
  width: 100px;
  height: auto;
  opacity: 0.9;
  animation: voyagerFlight2 60s linear infinite;
  z-index: 3;
  transform: scaleX(-1); /* Flip horizontally */
}

.voyager-trail-2 {
  position: absolute;
  width: 200px;
  height: 4px;
  background: linear-gradient(
    to right,
    rgba(255, 0, 0, 0),        /* Changed to red with 0 opacity */
    rgba(255, 30, 0, 0.8),     /* Bright red */
    rgba(255, 60, 0, 0.9)      /* Slightly lighter red */
  );
  filter: blur(3px);
  transform: translate(225px, -70px) rotate(155deg);
  box-shadow: 
    0 0 10px rgba(255, 0, 0, 0.5),    /* Red glow */
    0 0 20px rgba(255, 0, 0, 0.3);     /* Red outer glow */
}

.trail-container-2 {
  position: absolute;
  left: -200px;
  z-index: 2;
  animation: voyagerFlight2 60s linear infinite;
  transform: scaleX(-1); /* Flip horizontally */
}

@keyframes voyagerFlight2 {
  from {
    transform: translate(calc(100vw + 100px), calc(30vh - 100px)) rotate(15deg);
  }
  to {
    transform: translate(-200px, calc(70vh + 100px)) rotate(15deg);
  }
}

.warbird-formation {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1; /* Below UI elements */
  pointer-events: none;
}

.warbird {
  width: 40px;
  height: auto;
  opacity: 0.9;
  z-index: 3;
  transform: rotate(55deg);
}

.warbird-container {
  position: absolute;
  animation: warbirdFlight 20s linear infinite;
}

/* Adjusted to line formation with 4 ships */
.warbird-1 { 
  animation-delay: 0s;
  transform: translate(0, 0); /* Lead ship */
}
.warbird-2 { 
  animation-delay: 0.5s;
  transform: translate(-30px, 30px); /* Second ship */
}
.warbird-3 { 
  animation-delay: 1s;
  transform: translate(-60px, 60px); /* Third ship */
}
.warbird-4 { 
  animation-delay: 1.5s;
  transform: translate(-90px, 90px); /* Fourth ship */
}

.warbird-trail {
  position: absolute;
  width: 20px;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(100, 255, 0, 0),
    rgb(251, 255, 1),
    rgba(255, 123, 0, 0.925)
  );
  filter: blur(2px);
  transform: translate(14px, 24px) rotate(-95deg);
  box-shadow: 
    0 0 8px rgba(251, 255, 0, 1),
    0 0 15px rgba(251, 255, 0, 0.9);
  z-index: 2;
}

@keyframes warbirdFlight {
  0% {
    transform: translate(calc(100vw + 100px), calc(100vh + 100px)) 
               rotate(-55deg) scale(1);
  }
  50% {
    transform: translate(calc(50vw - 100px), calc(50vh - 100px)) 
               rotate(-55deg) scale(1.1);
  }
  100% {
    transform: translate(-200px, -200px) 
               rotate(-55deg) scale(1);
  }
}
</style>
