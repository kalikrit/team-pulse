import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  priority: text('priority').default('medium'), // low, medium, high
  deadline: text('deadline'), // ISO date string
  completed: integer('completed', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(new Date().toISOString()),
})
