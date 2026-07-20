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

    <!-- Форма добавления (с лейблами) -->
    <div style="margin:20px 0;padding:20px;background:#f7fafc;border-radius:8px;">
      <div style="display:flex;flex-direction:column;gap:12px;">
        <!-- Название -->
        <div>
          <label style="display:block;font-weight:500;margin-bottom:4px;color:#2d3748;">Название *</label>
          <input
            v-model="newTask.title"
            placeholder="Введите название задачи"
            style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;"
          />
        </div>

        <!-- Описание -->
        <div>
          <label style="display:block;font-weight:500;margin-bottom:4px;color:#2d3748;">Описание</label>
          <textarea
            v-model="newTask.description"
            placeholder="Подробное описание (опционально)"
            style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;min-height:80px;"
          />
        </div>

        <!-- Приоритет и Дедлайн -->
        <div style="display:flex;gap:20px;flex-wrap:wrap;">
          <div style="flex:1;min-width:150px;">
            <label style="display:block;font-weight:500;margin-bottom:4px;color:#2d3748;">Приоритет</label>
            <select v-model="newTask.priority" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;">
              <option value="low">🟢 Низкий</option>
              <option value="medium">🟡 Средний</option>
              <option value="high">🔴 Высокий</option>
            </select>
          </div>
          <div style="flex:1;min-width:150px;">
            <label style="display:block;font-weight:500;margin-bottom:4px;color:#2d3748;">Дедлайн</label>
            <input
              v-model="newTask.deadline"
              type="date"
              style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:16px;"
            />
          </div>
        </div>

        <!-- Кнопка -->
        <button
          @click="addTask"
          style="align-self:flex-start;padding:10px 24px;background:#667eea;color:white;border:none;border-radius:6px;cursor:pointer;font-size:16px;"
        >
          + Добавить задачу
        </button>
      </div>
    </div>

    <!-- Список задач -->
    <div>
      <div
        v-for="task in tasks"
        :key="task.id"
        style="display:flex;flex-direction:column;padding:12px;margin-bottom:8px;background:white;border-radius:6px;border:1px solid #e2e8f0;"
      >
        <div style="display:flex;justify-content:space-between;align-items:center;">
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
          <div style="display:flex;gap:8px;align-items:center;">
            <span v-if="task.priority" :style="{
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              background: task.priority === 'high' ? '#fc8181' : task.priority === 'medium' ? '#ecc94b' : '#48bb78',
              color: 'white'
            }">
              {{ task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢' }}
            </span>
            <span v-if="task.deadline" style="font-size:12px;color:#a0aec0;">
              📅 {{ formatDate(task.deadline) }}
            </span>
            <button
              @click="removeTask(task.id)"
              style="padding:4px 12px;background:#fc8181;color:white;border:none;border-radius:4px;cursor:pointer;"
            >
              Удалить
            </button>
          </div>
        </div>
        <div v-if="task.description" style="margin-top:8px;font-size:14px;color:#4a5568;padding-left:30px;">
          {{ task.description }}
        </div>
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

const newTask = ref({
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  deadline: '',
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU')
}

// Загружаем задачи при монтировании страницы
onMounted(() => {
  taskStore.fetchTasks()
})

const addTask = () => {
  if (newTask.value.title.trim()) {
    taskStore.addTask(
      newTask.value.title,
      newTask.value.description || undefined,
      newTask.value.priority,
      newTask.value.deadline || undefined
    )
    // Очищаем форму
    newTask.value = {
      title: '',
      description: '',
      priority: 'medium',
      deadline: '',
    }
  }
}

const removeTask = (id: number) => {
  taskStore.removeTask(id)
}

const toggleTask = (id: number) => {
  taskStore.toggleTask(id)
}
</script>
