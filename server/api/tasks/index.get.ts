import { defineEventHandler, createError } from 'h3'
import { taskService } from '~/server/services/taskService'

export default defineEventHandler(async () => {
  try {
    return await taskService.getAll()
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to fetch tasks',
    })
  }
})
