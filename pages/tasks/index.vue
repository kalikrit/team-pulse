<template>
  <div style="padding:20px;max-width:800px;margin:0 auto;">
    <h2>📋 Задачи</h2>
    <p style="color:#4a5568;">Управляйте своими задачами</p>

    <!-- Статистика -->
    <div style="display:flex;gap:20px;margin:16px 0;flex-wrap:wrap;">
      <span>Всего: {{ totalTasks }}</span>
      <span style="color:#48bb78;">Выполнено: {{ completedTasks }}</span>
      <span style="color:#fc8181;">Активных: {{ pendingTasks }}</span>
    </div>

    <!-- Форма добавления -->
    <div style="display:flex;gap:12px;margin:20px 0;">
      <input
        v-model="newTaskTitle"
        placeholder="Название задачи..."
        style="flex:1;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;"
        @keyup.enter="addTask"
      />
      <button
        @click="addTask"
        style="padding:10px 24px;background:#667eea;color:white;border:none;border-radius:6px;cursor:pointer;font-size:16px;"
      >
        Добавить
      </button>
    </div>

    <!-- Список задач -->
    <div>
      <div
        v-for="task in tasks"
        :key="task.id"
        style="display:flex;justify-content:space-between;align-items:center;padding:12px;margin-bottom:8px;background:white;border-radius:6px;border:1px solid #e2e8f0;"
      >
        <div style="display:flex;align-items:center;gap:12px;">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task.id)"
            style="width:18px;height:18px;cursor:pointer;"
          />
          <span :style="{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#a0aec0' : '#2d3748' }">
            {{ task.title }}
          </span>
        </div>
        <button
          @click="removeTask(task.id)"
          style="padding:4px 12px;background:#fc8181;color:white;border:none;border-radius:4px;cursor:pointer;"
        >
          Удалить
        </button>
      </div>
      <p v-if="tasks.length === 0" style="color:#a0aec0;text-align:center;padding:40px;">
        Нет задач. Добавьте первую!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
const totalTasks = computed(() => taskStore.totalTasks)
const completedTasks = computed(() => taskStore.completedTasks)
const pendingTasks = computed(() => taskStore.pendingTasks)

const newTaskTitle = ref('')

const addTask = () => {
  if (newTaskTitle.value.trim()) {
    taskStore.addTask(newTaskTitle.value)
    newTaskTitle.value = ''
  }
}

const removeTask = (id: number) => {
  taskStore.removeTask(id)
}

const toggleTask = (id: number) => {
  taskStore.toggleTask(id)
}
</script>