import { taskService } from '~/server/services/taskService'

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id)
    const body = await readBody(event)
    return await taskService.update(id, body)
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to update task',
    })
  }
})
