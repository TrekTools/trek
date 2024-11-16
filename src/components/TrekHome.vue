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
    <!-- Boxes first in DOM order -->
    <div class="boxes-container">
      <div class="box box-left">Tools</div>
      <div class="box box-right" @click="toggleNFTs">
        <div class="nft-background"></div>
        <span class="box-text">NFTs</span>
      </div>
      <div class="box box-top" @click="toggleMenu">Quick Menu</div>
      <div class="box box-bottom" @click="toggleWarp">$WARP</div>
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
  </div>
</template>

<script>
export default {
  name: 'TrekHome',
  data() {
    return {
      menuOpen: false,
      nftOpen: false,
      warpOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    toggleNFTs() {
      this.nftOpen = !this.nftOpen;
    },
    toggleWarp() {
      this.warpOpen = !this.warpOpen;
    },
    handleImageError(e) {
      console.error('Image failed to load:', e.target.src);
    },
    openLink(url) {
      window.open(url, '_blank', 'noopener,noreferrer');
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
}

.text-background {
  font-family: 'Antonio', sans-serif;
  font-size: 20vw; /* Responsive font size */
  font-weight: 700;
  color: cyan;
  text-align: center;
  letter-spacing: 0.1em;
  animation: glow 2s ease-in-out infinite alternate;
  z-index: 20; /* Higher than boxes */
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
  width: 300px;
  height: 300px;
  background: rgba(0, 255, 255, 0.2);
  border: 2px solid cyan;
  display: flex;
  justify-content: center;
  align-items: center;
  color: cyan;
  font-family: 'Antonio', sans-serif;
  font-size: 2.5em;
  animation: 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 1s forwards;
  opacity: 0;
  transition: color 0.3s ease, 
              border-color 0.3s ease, 
              background-color 0.3s ease,
              box-shadow 0.3s ease;
  cursor: pointer;
  pointer-events: auto;
  z-index: 5;
}

.box:hover {
  color: gold;
  border-color: gold;
  background: rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  z-index: 15;
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
    transform: translate3d(calc(25vw + 50px), 0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInRight {
  from {
    transform: translateX(0) rotate(180deg);
    opacity: 0;
  }
  to {
    transform: translate3d(calc(-25vw - 50px), 0, 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInTop {
  from {
    transform: translateY(0) rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: translate3d(0, calc(25vh + 50px), 0) rotate(0deg);
    opacity: 1;
  }
}

@keyframes flyInBottom {
  from {
    transform: translateY(0) rotate(180deg);
    opacity: 0;
  }
  to {
    transform: translate3d(0, calc(-25vh - 50px), 0) rotate(0deg);
    opacity: 1;
  }
}

.quick-menu {
  position: fixed;
  right: -300px;
  /* Position it at the same height as the Quick Menu box */
  top: 120px; /* Aligns with the Quick Menu box */
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  padding: 20px;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateX(50px);
}

.menu-active {
  right: calc(350px); /* Positions it next to the Quick Menu box */
  opacity: 1;
  transform: translateX(0);
}

.menu-item {
  color: cyan;
  font-family: 'Antonio', sans-serif;
  font-size: 1.5em;
  margin: 15px 0;
  cursor: pointer;
  transition: color 0.3s ease;
  opacity: 0;
  transform: translateX(50px);
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

.menu-item:hover {
  color: gold;
}

.nft-gallery {
  position: fixed;
  right: -300px;
  bottom: 50px; /* Adjusted to align better */
  display: flex;
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateX(50px);
}

.gallery-active {
  right: calc(130px); /* Position next to NFT box */
  opacity: 1;
  transform: translateX(0);
}

.nft-item {
  width: 150px;
  height: 150px;
  border: 2px solid cyan;
  overflow: hidden;
  background: rgba(0, 255, 255, 0.1); /* Added to see container */
}

.nft-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* Added to fix potential spacing issues */
}

.nft-item:hover {
  border-color: gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  transform: scale(1.05);
}

.warp-gallery {
  position: fixed;
  left: calc(250px); /* Align with $WARP box */
  bottom: -450px; /* Start below screen */
  display: flex;
  flex-direction: column; /* Stack vertically */
  gap: 20px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid cyan;
  transition: all 0.3s ease;
  z-index: 25;
  opacity: 0;
  transform: translateY(50px);
}

.warp-active {
  bottom: 50px; /* Position above $WARP box */
  opacity: 1;
  transform: translateY(0);
}

.warp-item {
  width: 150px;
  height: 150px;
  border: 2px solid cyan;
  overflow: hidden;
  background: rgba(0, 255, 255, 0.1);
  opacity: 0;
  transform: translateY(50px);
}

.warp-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
  border-color: gold;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
  transform: scale(1.05);
}

.nft-item, .warp-item {
  position: relative; /* Ensure this is added to existing styles */
}

.tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: cyan;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
  border: 1px solid cyan;
  font-family: 'Antonio', sans-serif;
  z-index: 100;
}

.tooltip::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid cyan;
}

.nft-item:hover .tooltip,
.warp-item:hover .tooltip {
  opacity: 1;
  top: -45px;
}

.nft-item:hover .tooltip,
.warp-item:hover .tooltip {
  border-color: gold;
  color: gold;
}

.nft-item:hover .tooltip::after,
.warp-item:hover .tooltip::after {
  border-top-color: gold;
}
</style>
