<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            class="formControls_input"
            type="text"
            id="email"
            v-model="signInField.email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span v-if="!signInField.email">此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd password"
            placeholder="請輸入密碼"
            required
            v-model="signInField.password"
          />
          <input class="formControls_btnSubmit" type="button" value="登入" @click="signInButton" />
          <!-- onclick="javascript:location.href='/TodoList'" -->
          <a class="formControls_btnLink" href="#/sign_up">註冊帳號</a>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// API
const apiUrl = 'https://todolist-api.hexschool.io'

// 登入表單的欄位
const signInField = ref({
  email: '',
  password: ''
})

// 儲存用戶資訊
const user = ref({
  nickname: '',
  uid: ''
})

// 登入按鈕的功能實作
const signInButton = async () => {
  try {
    // 發送登入請求
    const res = await axios.post(`${apiUrl}/users/sign_in`, signInField.value)

    // 取得 token 和 nickname（暱稱）
    const token = res.data.token
    const nickname = res.data.nickname

    // 儲存 token 到 cookie 以供後續使用
    document.cookie = `customTodoToken=${token}; path=/;`

    // 使用 Vue Router 進行頁面跳轉，並將暱稱傳遞到 /todolist
    router.push({
      path: '/todolist',
      query: { nickname }
    })
  } catch (error) {
    // 顯示具體的錯誤訊息
    if (error.response && error.response.data.message) {
      alert(`登入失敗：${error.response.data.message}`)
    } else {
      console.error('未知的登入錯誤：', error)
    }
  }
}

// 檢查是否有傳遞 email 來自註冊頁面，並自動填入
onMounted(async () => {
  if (route.query.email) {
    signInField.value.email = route.query.email
  }

  // 檢查 cookie 中是否有 token，如果有則進行用戶驗證
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)customTodoToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1'
  )

  if (token) {
    try {
      const res = await axios.get(`${apiUrl}/users/checkout`, {
        headers: {
          Authorization: token
        }
      })
      user.value = res.data
      // 這裡您可以根據需要進行其他操作，如自動跳轉到已登入狀態的頁面
    } catch (error) {
      console.log('驗證失敗', error)
      // 在這裡處理驗證失敗的情況，如清除 token 或顯示提示訊息
    }
  }
})
</script>

<style scoped>
/* @import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css'); */
@import url('https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css');
/* @import url('https://fonts.googleapis.com/earlyaccess/notosanstc.css');
@import url('https://fonts.googleapis.com/css?family=Baloo+Tamma+2:600, 700'); */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
@import url('../assets/todolist_style.css');
</style>
