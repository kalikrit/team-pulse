<template>
  <div style="padding:20px;font-family:sans-serif;">
    <nav style="display:flex;gap:20px;margin-bottom:20px;border-bottom:1px solid #e2e8f0;padding-bottom:12px;">
      <NuxtLink to="/" style="color:#667eea;font-weight:500;">🏠 Главная</NuxtLink>
      <NuxtLink to="/dashboard" style="color:#667eea;font-weight:500;">📊 Дашборд</NuxtLink>
    </nav>
    <slot />
  </div>
</template>
