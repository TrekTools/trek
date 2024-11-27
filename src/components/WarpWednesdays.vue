<template>
  <div class="warp-wednesdays-container">
    <!-- Content sections -->
    <div class="content-container">
      <div class="section">
        <h2>Warp Wednesdays</h2>
        <div class="section-content">
          <div v-for="(post, index) in blogPosts" 
               :key="index"
               class="blog-post">
            <h3>{{ post.title }}</h3>
            <div class="post-date">{{ post.date }}</div>
            <div class="post-content">{{ post.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back button -->
    <div class="back-button" @click="goBack">
      &lt; Back to Home
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'WarpWednesdays',
  setup() {
    const router = useRouter()
    
    const blogPosts = [
      {
        title: "Launch of Warp Wednesdays",
        date: "2024-03-20",
        content: "Welcome to our first Warp Wednesday! Each week, we'll be sharing updates, insights, and developments from the Trek ecosystem."
      },
      // Add more blog posts here
    ]

    const goBack = () => {
      router.push('/')
    }

    return {
      blogPosts,
      goBack
    }
  }
}
</script>

<style scoped>
.warp-wednesdays-container {
  width: 100%;
  height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.section {
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: 100px auto;
  padding: 40px;
  background: #ff9c00; /* LCARS orange */
  border-radius: 40px;
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
</style> 