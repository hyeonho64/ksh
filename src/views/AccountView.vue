<template>
  <div class="d-flex flex-nowrap" style="margin: 2rem">
    <div class="info">
      <h2 style="font-weight: bold;">rr</h2>
    </div>
    <div class="account">
      <h2 style="font-weight: bold; margin-bottom: 1rem;">회원정보</h2>
      <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">이메일 주소</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">비밀번호</label>
      </div>
      <div class="form-floating mb-3">
        <input type="number" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingInput">나이</label>
      </div>
    </div>
  </div>
</template>

<style>
.account {
  font-family: Pretendard-Regular;
  width: 50vw;
}

.info {
  width: 40vw;
}
</style>

<script>
export default {
  mounted() {

  }
}
</script>