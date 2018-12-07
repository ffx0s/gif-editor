const state = () => ({
  status: false
})

const mutations = {
  toggle(state) {
    state.status = !state.status
  }
}

export default {
  state,
  mutations,
  namespaced: true
}
