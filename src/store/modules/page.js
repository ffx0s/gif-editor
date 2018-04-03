/**
 * 页面相关
 */

const state = {
  // 页面切换方向
  direction: 'forward'
}

const mutations = {
  updateDirection(state, data) {
    state.direction = data.direction
  }
}

const getters = {
  direction: state => state.direction
}

export default {
  state,
  mutations,
  getters
}
