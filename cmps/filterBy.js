import { utilService } from "../services/util.service.js"

export default {
    template: `
    <section class="filterBy">
        <form @submit.prevent="filter">

            <input 
            type="text" 
            v-model="filterBy.task"
            placeholder="filter.."
            @input = "filter"
            />

            <select @change="filter" v-model="filterBy.status">
               <!-- <option>  All </option> -->

               <option value ="all"> All </option>
               <option :value ="true"> done </option>
               <option :value ="false"> not done </option>
            </select>


            <button> filter </button>

        </form>

    </section>
    
    `,
    data() {
        return {
            filterBy: {
                task: '',
                status: null
            }
        }
    },
    created() {
        this.filter = utilService.debounce(() => {
            console.log('Performing search')
            this.$store.dispatch({ type: 'setFilterBy', filterBy: this.filterBy })
        })

    },
    methods: {
    },
    computed: {
    }

}