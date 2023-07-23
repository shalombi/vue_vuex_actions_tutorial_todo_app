import { todoService } from '../../services/todo.service.js'
import { userService } from '../../services/user.service.js'


export const todoModule = {
  strict: true,
  state() {
    return {
      todos: [],
      filterBy: {
        task: '',
        status: null
      },
      isLoading: false
    }
  },
  mutations: {

    setTodos(state, { todos }) {
      state.todos = todos
    },


    addTodo({ todos }, { todo }) {
      todos.push(todo)
    },
    editTodo(state, { todo }) {
      let newTodos = [...state.todos]
      newTodos = newTodos.map(t => t._id !== todo._id ? t : todo)
      state.todos = [...newTodos]
    },

    removeTodo(state, { todoId }) {
      const idx = state.todos.findIndex(todo => todo._id === todoId)
      state.todos.splice(idx, 1)
    },

    toggleIsDone(state, { todo }) {
      const newTodo = { ...todo, isDone: !todo.isDone }
      let newTodos = [...state.todos]
      newTodos = newTodos.map(t => t._id !== newTodo._id ? t : newTodo)
      state.todos = [...newTodos]
    },

    setIsLoading(state, { isLoading }) {
      state.isLoading = isLoading
    },

   
  },
  getters: {
    todos({ todos }) {
      return todos
    },
    isLoading({ isLoading }) {
      return isLoading
    }
  },

  actions: {
    loadTodos(context) {
      context.commit({ type: 'setIsLoading', isLoading: true })
      return todoService.query()
        .then(todos => {
          context.commit({ type: 'setTodos', todos })
          return todos
        })
        .finally(() => {
          context.commit({ type: 'setIsLoading', isLoading: false })
        })
    },
    removeTodo({ commit }, { todoId }) {
      todoService.remove(todoId)
        .then(() => {
          commit({ type: 'removeTodo', todoId })
        })
    },
    saveTodo({ commit }, { todo }) {
      const isEdit = todo._id
      todoService.save(todo)
        .then((savedTodo) => {

          const type = isEdit ? 'editTodo' : 'addTodo'
          commit({ type, todo: savedTodo })
        })
    },
    setFilterBy({ commit }, { filterBy }) {
      todoService.query(filterBy)
        .then(todos => {
          commit({ type: 'setTodos', todos })
        })
    },
  }

}
