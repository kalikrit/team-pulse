<template>
  <div style="
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-secondary);
    color: var(--text-primary);
  ">
    <!-- Навигация -->
    <nav style="
      padding: 16px 24px;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      gap: 24px;
      align-items: center;
    ">
      <NuxtLink to="/" style="color: #667eea; font-weight: 600; font-size: 18px;">
        📊 Team Pulse
      </NuxtLink>
      <NuxtLink to="/" style="color: #4a5568; text-decoration: none; font-weight: 500;">
        Главная
      </NuxtLink>
      <NuxtLink to="/dashboard" style="color: #4a5568; text-decoration: none; font-weight: 500;">
        Дашборд
      </NuxtLink>
    </nav>

    <!-- Основной контент -->
    <main style="flex: 1; padding: 24px;">
      <slot />
    </main>

    <!-- Футер -->
    <AppFooter />
  </div>
</template>