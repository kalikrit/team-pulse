<template>
  <footer style="
    margin-top: 40px;
    padding: 20px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
    color: #a0aec0;
    font-size: 14px;
  ">
    <p>
      Team Pulse 
      <span style="background: #edf2f7; padding: 2px 8px; border-radius: 4px; font-size: 12px;">
        v{{ version }}
      </span>
    </p>
    <p style="font-size: 12px; margin-top: 4px;">
      © 2026 — Все права защищены
    </p>
  </footer>
</template>

<script setup lang="ts">
import packageJson from '~/package.json'

const version = packageJson.version
</script>