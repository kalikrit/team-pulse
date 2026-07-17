import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  await db.delete(tasks).where(eq(tasks.id, id))
  return { success: true }
})
