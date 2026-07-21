<template>
  <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <h3 style="margin-top:0;font-size:18px;color:#2d3748;">📊 Приоритеты задач</h3>
    <div style="padding:20px 0;color:#718096;display:flex;flex-direction:column;gap:8px;align-items:flex-start;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="min-width:70px;font-weight:500;">🟢 Низкий</span>
        <span style="font-weight:700;color:#2d3748;">{{ low }}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="min-width:70px;font-weight:500;">🟡 Средний</span>
        <span style="font-weight:700;color:#2d3748;">{{ medium }}</span>
      </div>
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="min-width:70px;font-weight:500;">🔴 Высокий</span>
        <span style="font-weight:700;color:#2d3748;">{{ high }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/stores/task'

const props = defineProps<{
  tasks: Task[]
}>()

const low = computed(() => props.tasks.filter(t => t.priority === 'low').length)
const medium = computed(() => props.tasks.filter(t => t.priority === 'medium').length)
const high = computed(() => props.tasks.filter(t => t.priority === 'high').length)
</script>
