import { defineStore } from 'pinia'

export interface Task {
  id: number
  title: string
  completed: boolean
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    nextId: 1,
  }),
  actions: {
    addTask(title: string) {
      this.tasks.push({
        id: this.nextId++,
        title,
        completed: false,
      })
    },
    removeTask(id: number) {
      this.tasks = this.tasks.filter(task => task.id !== id)
    },
    toggleTask(id: number) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },
  },
  getters: {
    pendingTasks: (state) => state.tasks.filter(t => !t.completed).length,
    completedTasks: (state) => state.tasks.filter(t => t.completed).length,
    totalTasks: (state) => state.tasks.length,
  },
})
