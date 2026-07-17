<template>
  <div style="min-height:100vh;display:flex;flex-direction:column;font-family:sans-serif;">
    <nav style="padding:16px 24px;background:white;border-bottom:1px solid #e2e8f0;display:flex;gap:24px;align-items:center;flex-wrap:wrap;">
      <NuxtLink to="/" style="color:#667eea;font-weight:600;font-size:18px;">
        📊 Team Pulse
      </NuxtLink>
      <NuxtLink to="/" style="color:#4a5568;text-decoration:none;font-weight:500;">
        Главная
      </NuxtLink>
      <NuxtLink to="/dashboard" style="color:#4a5568;text-decoration:none;font-weight:500;">
        Дашборд
      </NuxtLink>
      <NuxtLink to="/tasks" style="color:#4a5568;text-decoration:none;font-weight:500;">
        📋 Задачи
      </NuxtLink>
    </nav>

    <main style="flex:1;padding:24px;">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>
