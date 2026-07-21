<template>
  <div style="min-height:100vh;display:flex;flex-direction:column;font-family:sans-serif;">
    <!-- Навигация -->
    <nav style="padding:16px 24px;background:white;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <NuxtLink to="/" style="color:#667eea;font-weight:600;font-size:18px;text-decoration:none;">
        📊 Team Pulse
      </NuxtLink>
      <NuxtLink
        to="/"
        :style="{
          color: isActive('/') ? '#667eea' : '#4a5568',
          fontWeight: isActive('/') ? '600' : '500',
          textDecoration: 'none',
          paddingBottom: '4px',
          borderBottom: isActive('/') ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s'
        }"
      >
        Главная
      </NuxtLink>
      <NuxtLink
        to="/dashboard"
        :style="{
          color: isActive('/dashboard') ? '#667eea' : '#4a5568',
          fontWeight: isActive('/dashboard') ? '600' : '500',
          textDecoration: 'none',
          paddingBottom: '4px',
          borderBottom: isActive('/dashboard') ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s'
        }"
      >
        Дашборд
      </NuxtLink>
      <NuxtLink
        to="/tasks"
        :style="{
          color: isActive('/tasks') ? '#667eea' : '#4a5568',
          fontWeight: isActive('/tasks') ? '600' : '500',
          textDecoration: 'none',
          paddingBottom: '4px',
          borderBottom: isActive('/tasks') ? '2px solid #667eea' : '2px solid transparent',
          transition: 'border-color 0.2s'
        }"
      >
        📋 Задачи
      </NuxtLink>
    </nav>

    <!-- Основной контент -->
    <main style="flex:1;padding:24px;">
      <slot />
    </main>

    <!-- Футер -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

const isActive = (path: string) => {
  // Для главной страницы проверяем точное совпадение
  if (path === '/') {
    return route.path === '/'
  }
  // Для остальных страниц проверяем, начинается ли путь с указанного
  return route.path.startsWith(path)
}
</script>
