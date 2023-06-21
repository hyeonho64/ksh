<template>
  <div class="app">
    <nav class="bg-body-tertiary border-bottom" style="height: 7vh;">
      <div class="d-flex flex-wrap navbar">
        <img src="../public/img/ksh_transparent.png" width="24" height="24" style="margin-right: 0.5rem;">
        <ul class="nav me-auto">
          <li class="nav-item"><a href="/" class="nav-link link-body-emphasis px-2">홈</a></li>
          <li class="nav-item"><a href="/game" class="nav-link link-body-emphasis px-2">게임</a></li>
          <li class="nav-item"><a href="/about" class="nav-link link-body-emphasis px-2">소개</a></li>
          <li class="nav-item"><a href="/account" class="nav-link link-body-emphasis px-2">회원정보</a></li>
          <li class="nav-item"><a href="/settings" class="nav-link link-body-emphasis px-2">설정</a></li>
        </ul>
        <ul class="nav">
          <li class="nav-item"><a href="#" class="nav-link link-body-emphasis px-2">로그인</a></li>
          <li class="nav-item" style="margin-right: 0.3rem;"><a href="#" class="nav-link link-body-emphasis px-2">회원가입</a></li>
          <li class="nav-item" style="border-radius: 0.5rem; background-color: #b0b0b0; font-weight: bold;">
            <a href="#" class="nav-link link-body-emphasis px-2">
              <div class="clock">
                <div class="time">
                  <span class="period" id="period"></span>
                  <span class="luxury-text" id="hours"></span>
                  <span class="separator">:</span>
                  <span class="luxury-text" id="minutes"></span>
                  <span class="separator">:</span>
                  <span class="luxury-text" id="seconds"></span>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
.app {
  height: 100%;
  width: 100%;
}

.navbar {
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.8rem;
  font-family: Pretendard-Regular;
}
</style>

<script>
import "../public/font.css"

export default {
  mounted() {
    function updateClock() {
      var hoursElement = document.getElementById('hours');
      var minutesElement = document.getElementById('minutes');
      var secondsElement = document.getElementById('seconds');
      var periodElement = document.getElementById('period');
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();

      var 구분 = '';
      if (hours >= 0 && hours < 12) {
        구분 = '오전 ';
      } else if (hours >= 12 && hours < 18) {
        구분 = '오후 ';
      } else {
        구분 = '오후 ';
      }

      hours = hours % 12;
      hours = hours ? hours : 12;

      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
      periodElement.textContent = 구분;

      requestAnimationFrame(updateClock);
    }

    window.onload = function() {
      requestAnimationFrame(updateClock);
    };
  }
}
</script>