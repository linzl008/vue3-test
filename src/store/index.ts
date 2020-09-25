import { createStore } from 'vuex'

export default createStore({
  state: {
    index: -1
  },
  mutations: {
    setIndex (state, index) {
      state.index = index
    }
  },
  actions: {
    setIndex ({ commit }, index) {
      commit('setIndex', index)
    }
  },
  modules: {
  }
})
