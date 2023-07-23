export default {
    template: `
            <header>
                <nav>
                    <router-link to="/">Home</router-link> |
                    <router-link to="/todo">Todos</router-link> |
                    <router-link to="/user">Profile</router-link>
                </nav>
               <h3>Hello {{ user.fullName }}</h3>
            </header>
    `,
    data() {
        return {
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {

    },
    components: {
    },
}
