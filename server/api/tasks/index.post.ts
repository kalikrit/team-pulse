import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const newTask = await db.insert(tasks).values({
      title: body.title,
      description: body.description || null,
      priority: body.priority || 'medium',
      deadline: body.deadline || null,
      completed: false,
    }).returning()
    return newTask[0]
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create task',
    })
  }
})
