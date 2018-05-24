/**
 * 页面
 */

const state = {
  // 页面切换方向
  direction: 'forward',
  // 页面滚动条坐标信息
  historyPage: {}
}

const mutations = {
  updateDirection(state, data) {
    state.direction = data.direction
  },
  saveScrollTop(state, { path, scrollTop, hash }) {
    if (!state.historyPage[path]) {
      state.historyPage[path] = {}
    }
    state.historyPage[path].scrollTop = scrollTop
    state.historyPage[path].hash = hash
  }
}

const getters = {
  direction: state => state.direction,
  historyPage: state => state.historyPage
}

export default {
  state,
  mutations,
  getters
}
