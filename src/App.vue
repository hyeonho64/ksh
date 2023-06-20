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
    function updateClock() {
      var hoursElement = document.getElementById('hours');
      var minutesElement = document.getElementById('minutes');
      var secondsElement = document.getElementById('seconds');
      var periodElement = document.getElementById('period');
      var currentTime = new Date();
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();

      // 시간에 따라 인사말과 오전/오후 구분
      var 인사말 = '';
      var 구분 = '';
      if (hours >= 0 && hours < 12) {
        인사말 = '좋은 아침입니다';
        구분 = '오전 ';
      } else if (hours >= 12 && hours < 18) {
        인사말 = '좋은 오후입니다';
        구분 = '오후 ';
      } else {
        인사말 = '좋은 저녁입니다';
        구분 = '오후 ';
      }

      // 12시간 형식으로 변환
      hours = hours % 12;
      hours = hours ? hours : 12; // 만약 hours가 0이라면 12로 설정

      // 앞에 0을 붙이고 고급스러운 스타일을 적용
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
      periodElement.textContent = 구분;

      // 다음 애니메이션 프레임에서 시계 업데이트
      requestAnimationFrame(updateClock);
    }

    // 페이지 로드 시 시계 시작
    window.onload = function() {
      requestAnimationFrame(updateClock);
    };
  }
}
</script>