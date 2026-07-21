<template>
  <div style="max-width:900px;margin:0 auto;padding:20px;">
    <!-- Заголовок -->
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
      <h1 style="font-size:28px;font-weight:700;color:#2d3748;margin:0;">📋 Задачи</h1>
      <span style="font-size:16px;color:#a0aec0;">Управляйте своими задачами</span>
    </div>

    <!-- Статистика -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin:20px 0 24px;">
      <div style="background:white;padding:16px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
        <div style="font-size:28px;font-weight:700;color:#2d3748;">{{ totalTasks }}</div>
        <div style="font-size:14px;color:#718096;">Всего</div>
      </div>
      <div style="background:white;padding:16px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
        <div style="font-size:28px;font-weight:700;color:#48bb78;">{{ completedTasks }}</div>
        <div style="font-size:14px;color:#718096;">Выполнено</div>
      </div>
      <div style="background:white;padding:16px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
        <!-- Меняем цвет с #fc8181 на #4299e1 -->
        <div style="font-size:28px;font-weight:700;color:#4299e1;">{{ pendingTasks }}</div>
        <div style="font-size:14px;color:#718096;">Активных</div>
      </div>
    </div>

    <!-- Фильтры и поиск -->
    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;padding:16px;background:#f7fafc;border-radius:12px;align-items:center;">
      <div style="flex:1;min-width:150px;">
        <input
          v-model="searchQuery"
          placeholder="🔍 Поиск по названию..."
          style="width:100%;padding:8px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;"
        />
      </div>
      <div style="min-width:120px;">
        <select v-model="filterStatus" style="width:100%;padding:8px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;background:white;">
          <option value="all">Все статусы</option>
          <option value="active">Активные</option>
          <option value="completed">Выполненные</option>
        </select>
      </div>
      <div style="min-width:120px;">
        <select v-model="filterPriority" style="width:100%;padding:8px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;background:white;">
          <option value="all">Все приоритеты</option>
          <option value="low">🟢 Низкий</option>
          <option value="medium">🟡 Средний</option>
          <option value="high">🔴 Высокий</option>
        </select>
      </div>
      <button
        @click="resetFilters"
        style="padding:8px 16px;background:#e2e8f0;color:#2d3748;border:none;border-radius:8px;font-size:14px;cursor:pointer;transition:background 0.2s;"
        @mouseover="$event.target.style.background='#cbd5e0'"
        @mouseout="$event.target.style.background='#e2e8f0'"
      >
        Сбросить
      </button>
    </div>

    <!-- Карточка формы добавления -->
    <div style="background:white;padding:24px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);margin-bottom:30px;">
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div>
          <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Название *</label>
          <input
            v-model="newTask.title"
            placeholder="Введите название задачи"
            style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;transition:border-color 0.2s;"
            @focus="$event.target.style.borderColor='#667eea'"
            @blur="$event.target.style.borderColor='#e2e8f0'"
          />
        </div>
        <div>
          <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Описание</label>
          <textarea
            v-model="newTask.description"
            placeholder="Подробное описание (опционально)"
            style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;min-height:80px;transition:border-color 0.2s;resize:vertical;"
            @focus="$event.target.style.borderColor='#667eea'"
            @blur="$event.target.style.borderColor='#e2e8f0'"
          />
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:16px;">
          <div style="flex:1;min-width:150px;">
            <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Приоритет</label>
            <select v-model="newTask.priority" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;background:white;">
              <option value="low">🟢 Низкий</option>
              <option value="medium">🟡 Средний</option>
              <option value="high">🔴 Высокий</option>
            </select>
          </div>
          <div style="flex:1;min-width:150px;">
            <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Дедлайн</label>
            <input
              v-model="newTask.deadline"
              type="date"
              style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;"
            />
          </div>
          <div style="flex:1;min-width:150px;display:flex;align-items:flex-end;">
            <button
              @click="addTask"
              :disabled="!newTask.title.trim()"
              style="width:100%;padding:10px 24px;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.2s;"
              :style="newTask.title.trim() ? 'background:#667eea;color:white;' : 'background:#e2e8f0;color:#a0aec0;cursor:not-allowed;'"
            >
              + Добавить задачу
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Список задач (отфильтрованный) -->
    <div>
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        style="display:flex;flex-direction:column;padding:16px;margin-bottom:12px;background:white;border-radius:12px;border:1px solid #e2e8f0;transition:box-shadow 0.2s;"
        @mouseover="$event.currentTarget.style.boxShadow='0 4px 6px -1px rgba(0,0,0,0.05)'"
        @mouseout="$event.currentTarget.style.boxShadow='none'"
      >
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:12px;flex:1;">
            <input
              type="checkbox"
              :checked="task.completed"
              @change="toggleTask(task.id)"
              style="width:20px;height:20px;cursor:pointer;accent-color:#667eea;"
            />
            <span :style="{
              fontSize: '16px',
              fontWeight: task.completed ? '400' : '500',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#a0aec0' : '#2d3748',
            }">
              {{ task.title }}
            </span>
          </div>
          <div style="display:flex;gap:8px;align-items:center;flex-shrink:0;">
            <span v-if="task.priority" :style="{
              padding: '2px 10px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              background: task.priority === 'high' ? '#fed7d7' : task.priority === 'medium' ? '#fefcbf' : '#c6f6d5',
              color: task.priority === 'high' ? '#c53030' : task.priority === 'medium' ? '#975a16' : '#276749',
            }">
              {{ task.priority === 'high' ? '🔴 Высокий' : task.priority === 'medium' ? '🟡 Средний' : '🟢 Низкий' }}
            </span>
            <span v-if="task.deadline" style="font-size:13px;color:#718096;">
              📅 {{ formatDate(task.deadline) }}
            </span>
            <button
              @click="openEditModal(task)"
              style="padding:4px 10px;background:#ebf4ff;color:#3182ce;border:none;border-radius:6px;cursor:pointer;font-size:14px;transition:background 0.2s;"
              @mouseover="$event.target.style.background='#bee3f8'"
              @mouseout="$event.target.style.background='#ebf4ff'"
            >
              ✏️
            </button>
            <button
              @click="removeTask(task.id)"
              style="padding:4px 10px;background:#fff5f5;color:#e53e3e;border:none;border-radius:6px;cursor:pointer;font-size:14px;transition:background 0.2s;"
              @mouseover="$event.target.style.background='#fed7d7'"
              @mouseout="$event.target.style.background='#fff5f5'"
            >
              🗑️
            </button>
          </div>
        </div>
        <div v-if="task.description" style="margin-top:8px;font-size:14px;color:#4a5568;padding-left:32px;">
          {{ task.description }}
        </div>
      </div>
      <p v-if="filteredTasks.length === 0" style="color:#a0aec0;text-align:center;padding:40px;font-size:16px;">
        {{ tasks.length === 0 ? 'Нет задач. Добавьте первую!' : 'Нет задач, соответствующих фильтрам.' }}
      </p>
    </div>

    <!-- Модальное окно редактирования (без изменений) -->
    <div v-if="isEditModalOpen" style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px;">
      <div style="background:white;padding:30px;border-radius:16px;max-width:500px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);">
        <h3 style="margin-top:0;font-size:22px;color:#2d3748;">Редактировать задачу</h3>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:20px;">
          <div>
            <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Название *</label>
            <input
              v-model="editTask.title"
              placeholder="Название задачи"
              style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;"
            />
          </div>
          <div>
            <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Описание</label>
            <textarea
              v-model="editTask.description"
              placeholder="Описание"
              style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;min-height:80px;resize:vertical;"
            />
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:16px;">
            <div style="flex:1;min-width:150px;">
              <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Приоритет</label>
              <select v-model="editTask.priority" style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;background:white;">
                <option value="low">🟢 Низкий</option>
                <option value="medium">🟡 Средний</option>
                <option value="high">🔴 Высокий</option>
              </select>
            </div>
            <div style="flex:1;min-width:150px;">
              <label style="display:block;font-weight:600;margin-bottom:6px;color:#2d3748;font-size:14px;">Дедлайн</label>
              <input
                v-model="editTask.deadline"
                type="date"
                style="width:100%;padding:10px 14px;border:1px solid #e2e8f0;border-radius:8px;font-size:16px;"
              />
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:12px;">
            <input
              type="checkbox"
              v-model="editTask.completed"
              style="width:20px;height:20px;accent-color:#667eea;cursor:pointer;"
            />
            <label style="font-weight:500;color:#2d3748;font-size:14px;">Выполнена</label>
          </div>
          <div style="display:flex;gap:12px;margin-top:12px;">
            <button
              @click="saveEditTask"
              style="flex:1;padding:12px;background:#667eea;color:white;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.2s;"
              @mouseover="$event.target.style.background='#5a67d8'"
              @mouseout="$event.target.style.background='#667eea'"
            >
              Сохранить
            </button>
            <button
              @click="closeEditModal"
              style="flex:1;padding:12px;background:#e2e8f0;color:#2d3748;border:none;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer;transition:background 0.2s;"
              @mouseover="$event.target.style.background='#cbd5e0'"
              @mouseout="$event.target.style.background='#e2e8f0'"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
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

// Состояние фильтров
const filterStatus = ref('all') // 'all' | 'active' | 'completed'
const filterPriority = ref('all') // 'all' | 'low' | 'medium' | 'high'
const searchQuery = ref('')

// Вычисляемый список задач с применёнными фильтрами
const filteredTasks = computed(() => {
  let result = tasks.value

  // Фильтр по статусу
  if (filterStatus.value === 'active') {
    result = result.filter(t => !t.completed)
  } else if (filterStatus.value === 'completed') {
    result = result.filter(t => t.completed)
  }

  // Фильтр по приоритету
  if (filterPriority.value !== 'all') {
    result = result.filter(t => t.priority === filterPriority.value)
  }

  // Поиск по названию (регистронезависимый)
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(query))
  }

  return result
})

// Сброс фильтров
const resetFilters = () => {
  filterStatus.value = 'all'
  filterPriority.value = 'all'
  searchQuery.value = ''
}

// Форма добавления
const newTask = ref({
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  deadline: '',
})

const isEditModalOpen = ref(false)
const editTask = ref({
  id: 0,
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  deadline: '',
  completed: false,
})

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU')
}

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

const openEditModal = (task: any) => {
  const { id, title, completed, description = '', priority = 'medium', deadline = '' } = task
  editTask.value = { id, title, completed, description, priority, deadline }
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const saveEditTask = async () => {
  if (editTask.value.title.trim()) {
    await taskStore.updateTask(editTask.value.id, {
      title: editTask.value.title,
      description: editTask.value.description || undefined,
      priority: editTask.value.priority,
      deadline: editTask.value.deadline || undefined,
      completed: editTask.value.completed,
    })
    closeEditModal()
  }
}
</script>
