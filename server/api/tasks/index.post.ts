import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newTask = await db.insert(tasks).values({
    title: body.title,
    completed: false,
  }).returning()
  return newTask[0]
})
