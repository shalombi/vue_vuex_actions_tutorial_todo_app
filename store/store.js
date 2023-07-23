import { todoModule } from "./modules/todo.store.js"
import { userModule } from "./modules/user.store.js"

const { createStore } = Vuex

const storeOptions = {
  strict: true,
  state() {
    return {
     
    }
  },
  mutations: {
  },
  getters: {
  },

  actions: {
  },
  modules:{
    todoModule,
    userModule
  }

}
export const store = createStore(storeOptions)


// store.subscribe(function (cmd, state) {
//   // console.log('**** Store state changed: ****')
//   // console.log('Command:', cmd.payload)
//   console.log('storeState:\n', state)
//   // console.log('*******************************')
// })