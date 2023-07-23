// import userMsg from './user-msg.js'

export default {
    template: `
            <section class="user-profile">
                user profile
                <pre>{{ user }}</pre>

                <form @submit.prevent="updateUsername()" >

                    <input 
                    v-model="userToEdit.fullName"
                    placeholder="update name.."
                    type="text"
                    />

                    <button>save</button>
                    
                </form >

            </section>
    `,
    data() {
        return {
            userToEdit: { fullName: '', favColor: '' }
        }
    },
    created() {
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        // checkout() {
        //     this.$store.commit({ type: 'checkout' })
        // },

        updateUsername() {
            this.$store.commit({ type: 'updateUsername', fullName: this.userToEdit.fullName })
            this.$router.push('/todo')
        }
    },
    components: {
        // userMsg,
    },
}
