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
                    <!-- <input 
                    v-model="userToEdit.favColor"
                    type="color"
                     name="favColor"
                    value=""
                      /> -->

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
        // this.user = this.$store.state.user
    },
    computed: {
        user() {
            return this.$store.state.user
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
