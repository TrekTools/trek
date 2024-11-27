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

    <!-- New Discover Menu -->
    <div class="new-discover-menu" :class="{ 'menu-slide-in': discoverOpen }">
      <div class="menu-item" @click="goToAboutTrek">About Trek</div>
      <div class="menu-item" @click="goToWarpWednesdays">Warp Wednesdays</div>
    </div>

    <!-- New Back Button -->
    <div class="back-button" 
         :class="{ 'back-slide-in': discoverOpen }"
         @click="toggleDiscover">
      &lt; Back
    </div>

    <!-- New Content Box -->
    <div class="discover-content" :class="{ 'content-fade-in': discoverOpen }">
      <h2>Welcome to Trek</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>

    <!-- Discover dropdown menu -->
    <div class="discover-menu" :class="{ 'menu-active': discoverOpen }">
      <div class="menu-item" @click="goToAboutTrek">About Trek</div>
      <div class="menu-item" @click="goToWarpWednesdays">Warp Wednesdays</div>
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
</template>

<script>
export default {
  name: 'TrekHome',
  data() {
    return {
      discoverOpen: false,
      menuOpen: false,
      nftOpen: false,
      warpOpen: false,
      isLeaving: false
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
    }
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
  opacity: 0;
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
  top: 200px;
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
  top: 200px;
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
  top: 200px;
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

.new-discover-menu {
  position: fixed;
  left: -300px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid cyan;
  color: cyan;
  padding: 30px;
  transition: all 0.5s ease 0.8s;
  opacity: 0;
  z-index: 30;
  width: 250px;
  display: block;
  visibility: visible;
}

.menu-slide-in {
  left: 50px;
  opacity: 1 !important;
  visibility: visible !important;
  display: block !important;
}

.new-discover-menu .menu-item {
  display: block;
  color: cyan !important;
  font-family: 'Antonio', sans-serif;
  font-size: 28px;
  margin: 25px 0;
  cursor: pointer;
  background: transparent;
  transition: color 0.3s ease;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
  white-space: nowrap;
  position: relative;
  z-index: 31;
}

.new-discover-menu .menu-item:hover {
  color: gold;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  transform: scale(1.05);
}

.discover-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  padding: 30px;
  color: cyan;
  font-family: 'Antonio', sans-serif;
  opacity: 0;
  transition: all 0.5s ease;
  z-index: 25;
}

.content-fade-in {
  opacity: 1;
  transition-delay: 1.1s;
}

.discover-content h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: cyan;
}

.discover-content p {
  margin-bottom: 15px;
  line-height: 1.5;
  color: cyan;
}

.back-button {
  position: fixed;
  right: -300px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  padding: 20px;
  width: 200px;
  color: cyan;
  font-family: 'Antonio', sans-serif;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.5s ease;
  opacity: 0;
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
}

.back-slide-in {
  right: 50px;
  opacity: 1;
  transition-delay: 0.6s;
}

.back-button:hover {
  color: gold;
  border-color: gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
}

/* Add new star styles */
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
  color: white; /* Icon color */
}

/* Discover dropdown menu styling */
.discover-menu {
  position: fixed;
  top: 200px;
  left: calc(20% - 80px); /* Align with Discover button */
  width: 160px;
  background: #ff9c00; /* LCARS orange */
  border-radius: 0 0 40px 40px;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(-20px);
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
</style>
