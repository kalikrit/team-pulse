import { db } from './server/database/client'
import { tasks } from './server/database/schema'

async function check() {
  try {
    // Пробуем получить структуру таблицы
    const result = await db.select().from(tasks).limit(1)
    console.log('✅ Таблица доступна, результат:', result)
  } catch (e) {
    console.error('❌ Ошибка:', e)
  }
}
check()
