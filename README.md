# 📊 Team Pulse

Платформа для мониторинга активности команды в реальном времени.

## 🚀 Технологии

- **Фреймворк:** Nuxt 3.12.4
- **Язык:** TypeScript
- **Управление состоянием:** Pinia
- **Стили:** CSS Modules
- **Сервер:** Nitro

## 📁 Структура проекта

```
project/
├── app.vue              # Корневой компонент
├── nuxt.config.ts       # Конфигурация Nuxt
├── pages/
│   ├── index.vue        # Главная страница
│   └── dashboard/
│       └── index.vue    # Дашборд
├── layouts/
│   └── default.vue      # Основной лейаут
├── assets/
│   └── css/             # Стили
└── server/              # API (Nitro)
```

## 🛠️ Установка и запуск

```bash
# Клонируем репозиторий
git clone https://github.com/your-username/team-pulse.git

# Переходим в папку проекта
cd team-pulse

# Устанавливаем зависимости
npm install

# Запускаем в режиме разработки
npm run dev

# Открываем браузер
http://localhost:3000
```

## 📝 Доступные страницы

- `/` — Главная страница
- `/dashboard` — Дашборд

## 📄 Лицензия

MIT