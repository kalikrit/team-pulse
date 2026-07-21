<template>
  <ClientOnly>
    <div style="max-width:1200px;margin:0 auto;padding:20px;">
      <h1 style="font-size:28px;font-weight:700;color:#2d3748;margin:0 0 8px;">📊 Дашборд</h1>
      <p style="color:#4a5568;margin-bottom:24px;">Обзор состояния задач</p>

      <StatsCards
        :total="totalTasks"
        :completed="completedTasks"
        :overdue="overdueTasksCount"
        :active="activeTasksCount"
      />

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:30px;">
        <PriorityChart :tasks="tasks" />
        <OverdueTasks :tasks="overdueTasks" />
      </div>

      <RecentTasks :tasks="recentTasks" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({ ssr: false })

import { useTaskStore } from '~/stores/task'
import StatsCards from '~/components/dashboard/StatsCards.vue'
import OverdueTasks from '~/components/dashboard/OverdueTasks.vue'
import PriorityChart from '~/components/dashboard/PriorityChart.vue'
import RecentTasks from '~/components/dashboard/RecentTasks.vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)

const totalTasks = computed(() => taskStore.totalTasks)
const completedTasks = computed(() => taskStore.completedTasks)
const activeTasksCount = computed(() => tasks.value.filter(t => !t.completed).length)

// ✅ Просроченные = невыполненные задачи с дедлайном меньше сегодня
const overdueTasks = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return tasks.value.filter(t => {
    if (t.completed || !t.deadline) return false
    const deadline = new Date(t.deadline)
    deadline.setHours(0, 0, 0, 0)
    return deadline < today
  })
})

const overdueTasksCount = computed(() => overdueTasks.value.length)

const recentTasks = computed(() => {
  return [...tasks.value]
    .sort((a, b) => {
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return bDate - aDate
    })
    .slice(0, 5)
})

onMounted(() => {
  taskStore.fetchTasks()
})
</script>
