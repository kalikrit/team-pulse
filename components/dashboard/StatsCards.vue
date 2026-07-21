<template>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;margin-bottom:30px;">
    <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
      <div style="font-size:32px;font-weight:700;color:#2d3748;">{{ total }}</div>
      <div style="font-size:14px;color:#718096;">Всего задач</div>
    </div>
    <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
      <div style="font-size:32px;font-weight:700;color:#48bb78;">{{ completed }}</div>
      <div style="font-size:14px;color:#718096;">Выполнено</div>
    </div>
    <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
      <div style="font-size:32px;font-weight:700;color:#fc8181;">{{ overdue }}</div>
      <div style="font-size:14px;color:#718096;">Просрочено</div>
    </div>
    <div style="background:white;padding:20px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);text-align:center;">
      <div style="font-size:32px;font-weight:700;color:#4299e1;">{{ active }}</div>
      <div style="font-size:14px;color:#718096;">Активных</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  total: number
  completed: number
  overdue: number
  active: number
}>()
</script>
