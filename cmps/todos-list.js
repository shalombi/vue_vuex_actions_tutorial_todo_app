import todoPreview from "./todo-preview.js"

export default {
    props: ["todos"],
    template: `
        <section class="list-todos">
             <ul v-for="todo in todos">
                 <todo-preview :todo="todo" />
                 <button @click="remove(todo._id)">x</button>
                 <button @click="onToggleIsDone(todo)">sign is done</button>
                 <router-link :to="'/todo/edit/' + todo._id"> edit </router-link>
             </ul>
        </section>
    
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {
        remove(todoId) {
            this.$emit('remove', todoId)
        },
        onToggleIsDone(todo){
            this.$emit('toggleIsDone',todo)
        }
    },
    computed: {
    },
    components: {
        todoPreview
    }

}