<template>
  <div class="app d-flex flex-nowrap">
    <div class="d-flex flex-column flex-shrink-0" style="width: 4.5rem;">
      <a href="/" class="d-block p-3 link-body-emphasis text-decoration-none">
        <img src="../public/img/ksh_transparent.png" width="40" height="40" />
      </a>
      <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li class="nav-item">
          <a href="#" class="nav-link py-3 border-bottom rounded-0" aria-current="page" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Home" data-bs-custom-class="nav-tooltip" data-bs-original-title="홈">
            <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Home"><use xlink:href="#home"></use></svg>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Products" data-bs-custom-class="nav-tooltip" data-bs-original-title="게임">
            <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Products"><use xlink:href="#grid"></use></svg>
          </a>
        </li>
        <li>
          <a href="#" class="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Customers" data-bs-custom-class="nav-tooltip" data-bs-original-title="Customers">
            <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle"></use></svg>
          </a>
        </li>
      </ul>
      <div class="border-top">
        <a href="#" class="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="Customers" data-bs-custom-class="nav-tooltip" data-bs-original-title="Customers">
          <svg class="bi pe-none" width="24" height="24" role="img" aria-label="Customers"><use xlink:href="#people-circle"></use></svg>
        </a>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
root {
  --primary-color: #22B7CE;
  --secondary-color: #66D8E7;
}

.app {
  width: 100vw;
  height: 100vh;
}

.nav-tooltip {
  --bs-tooltip-bg: #22B7CE;
  font-family: Pretendard-Regular;
}
</style>

<script>
import "../public/font.css"

export default {
  mounted() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
  }
}
</script>