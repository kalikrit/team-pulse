import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'

export default defineEventHandler(async () => {
  const allTasks = await db.select().from(tasks)
  return allTasks
})
