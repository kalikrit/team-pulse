<template>
  <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <h3 style="margin-top:0;font-size:18px;color:#2d3748;">⏰ Просроченные задачи</h3>
    <div v-if="tasks.length === 0" style="color:#a0aec0;padding:20px;text-align:center;">
      Нет просроченных задач 👍
    </div>
    <div
      v-for="task in tasks"
      :key="task.id"
      style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #edf2f7;"
    >
      <span style="color:#e53e3e;font-weight:500;">{{ task.title }}</span>
      <span style="font-size:12px;color:#718096;">📅 {{ formatDate(task.deadline) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/stores/task'

const props = defineProps<{
  tasks: Task[]
}>()

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('ru-RU')
}
</script>
