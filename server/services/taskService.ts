import { db } from '~/server/database/client'
import { tasks } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export interface CreateTaskData {
  title: string
  description?: string | null
  priority?: string
  deadline?: string | null
}

export interface UpdateTaskData {
  title?: string
  description?: string | null
  priority?: string
  deadline?: string | null
  completed?: boolean
}

export const taskService = {
  async getAll() {
    return await db.select().from(tasks)
  },

  async create(data: CreateTaskData) {
    const newTask = await db.insert(tasks).values({
      title: data.title,
      description: data.description || null,
      priority: data.priority || 'medium',
      deadline: data.deadline || null,
      completed: false,
    }).returning()
    return newTask[0]
  },

  async update(id: number, data: UpdateTaskData) {
    const updated = await db.update(tasks)
      .set({
        title: data.title,
        description: data.description,
        priority: data.priority,
        deadline: data.deadline,
        completed: data.completed,
      })
      .where(eq(tasks.id, id))
      .returning()
    return updated[0]
  },

  async delete(id: number) {
    await db.delete(tasks).where(eq(tasks.id, id))
  },
}
