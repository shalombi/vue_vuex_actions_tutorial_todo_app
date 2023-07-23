
export default {
    props: ["todo"],
    template: `
        <section class="todo-preview">
             <h3>{{ todo.task }}  | <span>{{ todo.isDone ? '✅':'📍' }}</span></h3> 
        </section>
    
    `,
    data() {
        return {
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
    }

}