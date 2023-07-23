
import { todoService } from '../services/todo.service.js'
import todosList from '../cmps/todos-list.js'
import filterBy from '../cmps/filterBy.js'


export default {
    template: `
        <section class="todo-app">
            <h1>Todos</h1>
            <filter-by/>
            <router-link to="/todo/edit"> add </router-link>
            <!-- <pre>{{ todos }}</pre>  -->
            <section v-if="isLoading" ><h2>Loading...</h2></section>
            <section v-else>
                <todos-list v-if="todos" :todos="todos" @remove="remove" @toggleIsDone="toggleIsDone"/>
            </section>

        </section>
    `,
    data() {
        return {

        }
    },

    created() {

        this.$store.dispatch({ type: 'loadTodos' })
        // console.log('todos:', this.todos)
    },

    computed: {
        todos() {
            return this.$store.getters.todos
        },

        isLoading() {
            return this.$store.getters.isLoading
        }


    },
    methods: {
        remove(todoId) {
            console.log('todoId:', todoId)
            this.$store.dispatch({ type: 'removeTodo', todoId })
        },

        toggleIsDone(todo) {
            const updatedTodo = { ...todo, isDone: !todo.isDone }
            console.log(updatedTodo)
            this.$store.dispatch({ type: 'toggleIsDone', todo: updatedTodo })
        }
    },

    components: {
        todosList,
        filterBy
    }
}
