<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3" style="font-family: Pretendard-Regular;">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <img src="../../public/img/ksh_transparent.png" width="20" height="20" class="rounded me-2" alt="...">
        <strong class="me-auto" style="font-weight: bold;">KSH 봇</strong>
        <small>방금</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        저희에게 기부해 주세요!  <a href="/donate">기부하기</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const toastLiveExample = document.getElementById('liveToast')
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    window.onload = function() {
      toastBootstrap.show()
    }
  }
}
</script>
