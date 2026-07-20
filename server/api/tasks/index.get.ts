import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'

export default defineEventHandler(async () => {
  try {
    const allTasks = await db.select().from(tasks)
    return allTasks
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch tasks',
    })
  }
})
