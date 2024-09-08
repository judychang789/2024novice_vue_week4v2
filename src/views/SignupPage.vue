<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
            v-model="signUpField.email"
          />
          <span v-if="!signUpField.email">此欄位不可留空</span>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
            v-model="signUpField.nickname"
          />
          <span v-if="!signUpField.nickname">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
            v-model="signUpField.password"
          />
          <span v-if="!signUpField.password">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請再次輸入密碼"
            required
            v-model="signUpField.passwordConfirm"
          />
          <span v-if="!signUpField.passwordConfirm">此欄位不可留空</span>
          <input
            class="formControls_btnSubmit"
            type="button"
            value="註冊帳號"
            @click="signUpButton"
          />
          <!-- {{ signUpField }} -->
          <br />
          <!-- UID：{{ signUpRes }} -->
          <!-- onclick="javascript:location.href='#todoListPage'"
          @click="signUpButton" -->
          <!-- <a class="formControls_btnLink" href="#loginPage">登入</a> -->
          <a class="formControls_btnLink" href="#/">登入</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

console.log(axios)
// API 的基本 URL
const apiUrl = 'https://todolist-api.hexschool.io'

// 註冊表單欄位
const signUpField = ref({
  email: '',
  password: '',
  nickname: '',
  passwordConfirm: ''
})

//註冊的UID值
const signUpRes = ref('')

// 檢查 email 格式的正則表達式
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// 註冊按鈕的功能實作
const signUpButton = async () => {
  //console.log('我要註冊')

  // 檢查欄位是否填寫完整
  if (
    !signUpField.value.email ||
    !signUpField.value.password ||
    !signUpField.value.nickname ||
    !signUpField.value.passwordConfirm
  ) {
    alert('所有欄位皆為必填，請檢查後再試')
    return
  }

  // 檢查 email 格式是否正確
  if (!emailPattern.test(signUpField.value.email)) {
    alert('請輸入正確的 email 格式')
    return
  }

  try {
    //正確的執行流程
    const res = await axios.post(`${apiUrl}/users/sign_up`, signUpField.value)
    //console.log(res)
    signUpRes.value = res.data.uid
    // 註冊成功後，5秒鐘後跳轉到登入頁
    // setTimeout(() => {
    //   //this.$router.push('/login') // 使用 Vue Router 進行頁面跳轉
    //   window.location.href = '/login' // 替換為你的登入頁 URL
    // }, 5000)

    alert('註冊成功，請登入')
    // 註冊成功後 2 秒鐘後跳轉至登入頁，並帶入 email
    setTimeout(() => {
      router.push({
        path: '/',
        query: { email: signUpField.value.email }
      })
    }, 2000)
  } catch (error) {
    // 註冊失敗的處理
    if (error.response && error.response.data.message) {
      alert('此帳號已註冊過')
    } else {
      console.error('註冊錯誤：', error)
    }
  }
}
</script>

<style scoped>
/* @import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css'); */
@import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
/* @import url('https://fonts.googleapis.com/earlyaccess/notosanstc.css');
@import url('https://fonts.googleapis.com/css?family=Baloo+Tamma+2:600, 700'); */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
@import url('../assets/todolist_style.css');

#signUpPage {
  padding: 30px 0;
}
</style>
