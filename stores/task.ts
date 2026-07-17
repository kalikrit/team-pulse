import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  completed: boolean
  createdAt?: string
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const data = await $fetch<Task[]>('/api/tasks')
        this.tasks = data
      } catch (e: any) {
        this.error = e.message
      } finally {
        this.loading = false
      }
    },

    async addTask(title: string) {
      try {
        const newTask = await $fetch<Task>('/api/tasks', {
          method: 'POST',
          body: { title },
        })
        this.tasks.push(newTask)
      } catch (e: any) {
        this.error = e.message
      }
    },

    async removeTask(id: number) {
      try {
        await $fetch(`/api/tasks/${id}`, { method: 'DELETE' })
        this.tasks = this.tasks.filter(t => t.id !== id)
      } catch (e: any) {
        this.error = e.message
      }
    },

    async toggleTask(id: number) {
      try {
        const task = this.tasks.find(t => t.id === id)
        if (!task) return
        const updated = await $fetch<Task>(`/api/tasks/${id}`, {
          method: 'PATCH',
          body: { completed: !task.completed },
        })
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = updated
        }
      } catch (e: any) {
        this.error = e.message
      }
    },
  },

  getters: {
    pendingTasks: (state) => state.tasks.filter(t => !t.completed).length,
    completedTasks: (state) => state.tasks.filter(t => t.completed).length,
    totalTasks: (state) => state.tasks.length,
  },
})
