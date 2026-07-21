<template>
  <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <h3 style="margin-top:0;font-size:18px;color:#2d3748;">📊 Приоритеты задач</h3>
    <div style="padding:20px;text-align:center;color:#718096;">
      <div>🟢 Низкий: {{ low }}</div>
      <div>🟡 Средний: {{ medium }}</div>
      <div>🔴 Высокий: {{ high }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/stores/task'

const props = defineProps<{
  tasks: Task[]
}>()

// Считаем все задачи, независимо от статуса выполнения
const low = computed(() => props.tasks.filter(t => t.priority === 'low').length)
const medium = computed(() => props.tasks.filter(t => t.priority === 'medium').length)
const high = computed(() => props.tasks.filter(t => t.priority === 'high').length)
</script>
