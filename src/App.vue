<template>
  <div class="app">
    <nav class="bg-body-tertiary border-bottom">
      <div class="d-flex flex-wrap navbar">
        <ul class="nav me-auto">
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Home</a></li>
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Features</a></li>
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">Pricing</a></li>
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">FAQs</a></li>
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">About</a></li>
        </ul>
        <ul class="nav">
          <!--  여기가 시계  -->
          <li class="nav-item" style="border-radius: 0.5rem; background-color: #b0b0b0; font-weight: bold;">
            <a href="#" class="nav-link link-body-emphasis px-2">오후 12:00:00</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.app {
}

.navbar {
  padding: 0.4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.9rem;
  font-family: Pretendard-Regular;
}
</style>

<script>
import "../public/font.css"

export default {
  mounted() {
  // 여기에 javascript 쓰고 밀리초마다 refresh 되게 해줘
  }
}
</script>