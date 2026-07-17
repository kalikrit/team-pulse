import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  const body = await readBody(event)
  const updated = await db.update(tasks)
    .set({ completed: body.completed })
    .where(eq(tasks.id, id))
    .returning()
  return updated[0]
})
