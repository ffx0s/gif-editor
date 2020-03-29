import Vue from 'vue'
import VueModal from './'

const defaultOptions = {
  confirm(instance) {
    instance.done()
  },
  cancel(instance) {
    instance.done()
  }
}

Object.keys(VueModal.props).forEach(prop => {
  defaultOptions[prop] = VueModal.props[prop].default
})

defaultOptions.value = true

let modal

function Modal(options) {
  if (process.server) return
  if (typeof options === 'string') {
    options = { content: options }
  }

  options = { ...defaultOptions, ...options }

  if (!modal) {
    modal = createInstance()
  }

  Object.assign(modal, options)
  return modal
}

function createInstance() {
  const instance = new (Vue.extend(VueModal))({
    el: document.createElement('div')
  })

  instance.$on('confirm', () => {
    instance.confirm(instance)
  })
  instance.$on('cancel', () => {
    instance.cancel(instance)
  })
  instance.$on('input', value => {
    instance.value = value
  })

  document.body.appendChild(instance.$el)
  return instance
}

Modal.install = Vue => {
  Vue.prototype.$modal = Modal
}

export default Modal
