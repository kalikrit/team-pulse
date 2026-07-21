<template>
  <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <h3 style="margin-top:0;font-size:18px;color:#2d3748;">🕒 Последние задачи</h3>
    <div v-if="tasks.length === 0" style="color:#a0aec0;padding:20px;text-align:center;">
      Нет задач
    </div>
    <div
      v-for="task in tasks"
      :key="task.id"
      style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #edf2f7;"
    >
      <div style="display:flex;align-items:center;gap:8px;">
        <span :style="{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: task.completed ? '#48bb78' : task.priority === 'high' ? '#fc8181' : '#ecc94b',
        }"></span>
        <span :style="{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#a0aec0' : '#2d3748' }">
          {{ task.title }}
        </span>
      </div>
      <span style="font-size:12px;color:#718096;">
        {{ task.completed ? '✅ Выполнена' : '🔄 В работе' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/stores/task'

const props = defineProps<{
  tasks: Task[]
}>()
</script>
