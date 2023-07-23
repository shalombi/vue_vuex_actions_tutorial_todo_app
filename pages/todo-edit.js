import { todoService } from "../services/todo.service.js"

export default {
    template: `
        <section class="todo-edit">
            todo edit

            <form @submit.prevent = "save">
                <input
                type="text" 
                placeholder="task.." 
                v-model = "todo.task"
                />
                <button>save</button>
            </form>

          <pre> {{ todo }}</pre>  
        </section>
    
    `,
    data() {
        return {
            todo: null
        }
    },
    created() {
        const id = this.$route.params.id
        console.log(id)

        if (id) {
            this.todo = todoService.getById(id)
        }
        else {
            this.todo = todoService.getEmptyTodo()
        }
    },
    methods: {
        save() {
            console.log('save')
            // this.$store.commit({ type: 'saveTodo', todo: this.todo })
            
            // this.$store.dispatch({ type: 'removeTodo', todoId })
            this.$store.dispatch({ type: 'saveTodo', todo: this.todo })

            this.$router.push('/todo')
        }

    },
    computed: {
    }

}

