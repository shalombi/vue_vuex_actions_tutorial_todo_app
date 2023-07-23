import { userService } from '../../services/user.service.js'


export const userModule  = {
  state() {
    return {
      user: userService.getLoggedinUser(),
    }
  },
  mutations: {
    updateUsername(state, { fullName }) {
      const updatedName = userService.updateUserName(fullName)
      state.user.fullName = updatedName
    }

  },
  getters: {
    user({ user }) {
      return user
    },
  },

  actions: {
  }

}
