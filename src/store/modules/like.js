import { like } from '@/api/pictures'

const LOCAL_LIKE_KEY = 'Like_data'

function getLocalData() {
  try {
    return JSON.parse(localStorage[LOCAL_LIKE_KEY])
  } catch (err) {
    return {}
  }
}

const state = () => ({
  data: getLocalData()
})

const mutations = {
  set(state, { id, status }) {
    state.data = Object.assign({}, state.data, { [id]: status })
    try {
      localStorage[LOCAL_LIKE_KEY] = JSON.stringify(state.data)
    } catch (err) {
      throw new Error(err.message)
    }
  },
  get(state) {
    state.data = getLocalData()
  }
}

const actions = {
  execute({ commit }, { id, status }) {
    return like(id, +status).then(() => {
      commit('set', { id, status })
    })
  }
}

export default {
  state,
  mutations,
  actions,
  namespaced: true
}
