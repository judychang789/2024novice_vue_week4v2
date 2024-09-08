<template>
  <div class="container">
    <h1>TODO LIST</h1>
    <div class="card input">
      <input v-model="newTask" type="text" placeholder="請輸入待辦事項" />
      <a href="#" class="btn_add" @click.prevent="addTask">+</a>
    </div>
    <div class="card card_list">
      <ul class="tab">
        <li :class="{ active: currentTab === '全部' }" @click="currentTab = '全部'">全部</li>
        <li :class="{ active: currentTab === '待完成' }" @click="currentTab = '待完成'">待完成</li>
        <li :class="{ active: currentTab === '已完成' }" @click="currentTab = '已完成'">已完成</li>
      </ul>
      <div class="cart_content">
        <ul class="list">
          <li v-for="(task, index) in filteredTasks" :key="index" :data-idNum="index">
            <label class="checkbox">
              <input type="checkbox" :checked="task.checked" @change="toggleTaskStatus(task)" />
              <span>{{ task.content }}</span>
            </label>
            <a href="#" class="delete" @click.prevent="removeTask(index)"></a>
          </li>
          <li v-if="filteredTasks.length === 0">
            <span>目前尚無待辦事項</span>
          </li>
        </ul>
        <div class="list_footer">
          <p>{{ remainingTasks }} 個待完成項目</p>
          <a href="#" @click.prevent="clearCompletedTasks"> 清除已完成項目 </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      currentTab: '全部',
      tasks: [
        { content: '把冰箱發霉的檸檬拿去丟', checked: false },
        { content: '明天買牛奶', checked: false }
      ]
    }
  },
  computed: {
    filteredTasks() {
      if (this.currentTab === '全部') {
        return this.tasks
      } else if (this.currentTab === '待完成') {
        return this.tasks.filter((task) => !task.checked)
      } else {
        return this.tasks.filter((task) => task.checked)
      }
    },
    remainingTasks() {
      return this.tasks.filter((task) => !task.checked).length
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim() === '') {
        alert('不可為空')
        return
      }
      this.tasks.push({ content: this.newTask, checked: false })
      this.newTask = ''
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    },
    toggleTaskStatus(task) {
      task.checked = !task.checked
    },
    clearCompletedTasks() {
      this.tasks = this.tasks.filter((task) => !task.checked)
    }
  }
}
</script>

<style scoped>
.container {
}

.tab .active {
  font-weight: bold;
  color: blue;
}

.list_footer {
  margin-top: 10px;
}

input[type='checkbox'] {
  margin-right: 10px;
}

.delete {
  color: red;
  cursor: pointer;
}
</style>
