import { taskService } from '~/server/services/taskService'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    return await taskService.create(body)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to create task',
    })
  }
})
