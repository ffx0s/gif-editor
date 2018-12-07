import editor from '@/editor/instance'

/**
 * 编辑器
 */

const state = {
  // 上传文件
  file: null,
  // 加载进度
  loadProgress: 0,
  // 解析进度
  parseProgress: 0,
  // 编辑状态：
  // 0 待上传
  // 1 已上传
  // 2 加载和解析中
  // 3 加载出错
  // 4 解析出错
  // 5 编辑中
  // 6 生成图片中
  // 7 生成图片完成
  status: 0,
  // 当前帧
  frameIndex: 0,
  // 总帧数
  frameLength: 0,
  // 是否为暂停状态
  pause: true,
  // 禁用撤销操作
  disableUndo: true,
  // 禁用还原操作
  disableRedo: true,
  // 当前操作（文字工具/铅笔工具/...）
  currentAction: ''
}

const mutations = {
  file(state, file) {
    state.file = file
    if (file) {
      state.status = 1
    }
  },
  progress(state, { name, value }) {
    state[`${name}Progress`] = value
  },
  status(state, value) {
    state.status = value
  },
  frameIndex(state, index) {
    state.frameIndex = index
  },
  frameLength(state, frameLength) {
    state.frameLength = frameLength
  },
  pause(state, pause) {
    state.pause = pause
  },
  undoRedostatus(state, [disableUndo, disableRedo]) {
    state.disableUndo = disableUndo
    state.disableRedo = disableRedo
  },
  currentAction(state, currentAction) {
    state.currentAction = currentAction
  }
}

const actions = {
  load({ commit, state }) {
    if (state.file) {
      commit('file', state.file)
      commit('progress', { name: 'load', value: 0 })
      commit('progress', { name: 'parse', value: 0 })
      commit('status', 2)
      editor.gif.load(state.file)
      // https://freshdesign.io/img/inspiration/woveC.gif
      // https://media.giphy.com/media/3o7aCZVImHIHQmPLy0/giphy.gif
      // https://o818xvhxo.qnssl.com/o_1cbc7bdanf1g1lg916uop4q1gt19.gif
      // https://o818xvhxo.qnssl.com/o_1cc04ds1psg7t0e19kj6ci4qa9.gif
      commit('file', null)
    }
  },
  play({ commit }) {
    editor.gif.play()
    commit('pause', false)
  },
  pause({ commit }) {
    editor.gif.pause()
    commit('pause', true)
  },
  reset({ commit }) {
    editor.reset()
    setTimeout(() => {
      commit('status', 0)
    })
  }
}

const getters = {
  loadProgress: state => state.loadProgress,
  parseProgress: state => state.parseProgress,
  status: state => state.status,
  frameIndex: state => state.frameIndex,
  frameLength: state => state.frameLength,
  pause: state => state.pause,
  disableUndo: state => state.disableUndo,
  disableRedo: state => state.disableRedo,
  currentAction: state => state.currentAction
}

export default {
  state,
  mutations,
  actions,
  getters
}
