import { defineStore } from 'pinia'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
    nextId: 1,
  }),
  actions: {
    addTodo(title: string) {
      this.todos.push({
        id: this.nextId++,
        title,
        completed: false,
      })
    },
    removeTodo(id: number) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    updateTodoTitle(id: number, title: string) {
      const todo = this.todos.find((todo) => todo.id === id)
      if (todo) {
        todo.title = title
      }
    },
  },
})
