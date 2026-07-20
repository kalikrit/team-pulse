import { taskService } from '~/server/services/taskService'

export default defineEventHandler(async (event) => {
  try {
    const id = Number(event.context.params?.id)
    await taskService.delete(id)
    return { success: true }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to delete task',
    })
  }
})
