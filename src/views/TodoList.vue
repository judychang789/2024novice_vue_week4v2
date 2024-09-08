<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ nickname }}的代辦</span></a
          >
        </li>
        <li><a href="/">登出</a></li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="card input inputBox">
          <input v-model="newTask" type="text" placeholder="請輸入待辦事項" />
          <a href="#" class="btn_add" @click.prevent="addTask">
            <!-- <i class="fa fa-plus"></i> -->
            <i class="bi bi-plus-lg"></i>
          </a>
        </div>
        <div class="card card_list todoList_list">
          <ul class="tab todoList_tab">
            <li :class="{ active: currentTab === '全部' }" @click="currentTab = '全部'">
              <a href="#">全部</a>
            </li>
            <li :class="{ active: currentTab === '待完成' }" @click="currentTab = '待完成'">
              <a href="#">待完成</a>
            </li>
            <li :class="{ active: currentTab === '已完成' }" @click="currentTab = '已完成'">
              <a href="#">已完成</a>
            </li>
          </ul>
          <div class="cart_content todoList_items">
            <ul class="list todoList_item">
              <li v-for="(task, index) in filteredTasks" :key="index" :data-idNum="index">
                <label class="checkbox todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    :checked="task.checked"
                    @change="toggleTaskStatus(task)"
                  />
                  <span>{{ task.content }}</span>
                </label>
                <a href="#" class="delete" @click.prevent="removeTask(index)">
                  <i class="bi bi-x-lg"></i>
                </a>
              </li>
              <li class="todoList_label" v-if="filteredTasks.length === 0">
                <span>目前尚無待辦事項</span>
              </li>
            </ul>
            <div class="list_footer todoList_statistics">
              <p>{{ remainingTasks }} 個待完成項目</p>
              <a href="#" @click.prevent="clearCompletedTasks" v-if="filteredTasks.length !== 0">
                清除已完成項目
              </a>
            </div>
          </div>
        </div>
      </div>
      <div id="todoList_img" class="todoList_img" v-if="filteredTasks.length === 0">
        <img src="../assets/no.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

// 用來接收登入頁面傳遞過來的暱稱
const nickname = ref('')
const newTask = ref('')
const currentTab = ref('全部')
const tasks = ref([
  { content: '把冰箱發霉的檸檬拿去丟', checked: false },
  { content: '打電話叫媽媽匯款給我', checked: false },
  { content: '整理電腦資料夾', checked: false },
  { content: '繳電費水費瓦斯費', checked: false },
  { content: '約vicky禮拜三泡溫泉', checked: false },
  { content: '約ada禮拜四吃晚餐', checked: false }
])

// API
const apiUrl = 'https://todolist-api.hexschool.io'

// 使用 useRoute 來接收傳遞過來的資料
const route = useRoute()

onMounted(async () => {
  // 如果有傳遞暱稱，則將其賦值給 nickname
  if (route.query.nickname) {
    nickname.value = route.query.nickname
  } else {
    // 如果沒有暱稱，從 cookie 中取 token 後請求取得用戶資料
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
        nickname.value = res.data.nickname
      } catch (error) {
        console.error('取得用戶資料失敗：', error)
      }
    }
  }
})

// 根據 currentTab 的值來篩選代辦事項
const filteredTasks = computed(() => {
  if (currentTab.value === '全部') {
    return tasks.value
  } else if (currentTab.value === '待完成') {
    return tasks.value.filter((task) => !task.checked)
  } else {
    return tasks.value.filter((task) => task.checked)
  }
})

// 計算尚未完成的代辦事項數量
const remainingTasks = computed(() => {
  return tasks.value.filter((task) => !task.checked).length
})

// 新增代辦事項
const addTask = () => {
  if (newTask.value.trim() === '') {
    alert('不可為空')
    return
  }
  tasks.value.push({ content: newTask.value, checked: false })
  newTask.value = ''
}

// 刪除指定的代辦事項
const removeTask = (index) => {
  tasks.value.splice(index, 1)
}

// 切換代辦事項的完成狀態
const toggleTaskStatus = (task) => {
  task.checked = !task.checked
}

// 清除所有已完成的代辦事項
const clearCompletedTasks = () => {
  tasks.value = tasks.value.filter((task) => !task.checked)
}
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/reset-css@5.0.2/reset.min.css');
/* @import url('https://fonts.googleapis.com/earlyaccess/notosanstc.css');
@import url('https://fonts.googleapis.com/css?family=Baloo+Tamma+2:600, 700'); */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css');
@import url('../assets/todolist_style.css');
</style>
