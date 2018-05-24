import Modal from './'

export default {
  install: Vue => {
    const _Modal = Vue.extend({
      render: function(createElement) {
        const vm = this

        if (vm.show) {
          return createElement(
            Modal,
            {
              on: {
                cancel() {
                  if (!vm.cancel()) {
                    vm.show = false
                  }
                },
                confirm() {
                  if (!vm.confirm()) {
                    vm.show = false
                  }
                }
              },
              props: {
                showCancelButton: vm.showCancelButton,
                showConfirmButton: vm.showConfirmButton
              }
            },
            [
              createElement('div', {
                slot: 'body',
                domProps: {
                  innerHTML: vm.body
                }
              })
            ]
          )
        }
      },
      data() {
        return {
          show: false,
          body: '',
          confirm: () => {},
          cancel: () => {},
          showCancelButton: false,
          showConfirmButton: true
        }
      },
      componetms: {
        Modal
      }
    })

    // 创建实例
    const vm = new _Modal({
      el: document.createElement('div')
    })

    // 插入文档
    document.body.appendChild(vm.$el)

    // 调用接口
    Vue.prototype.$alert = function(options) {
      Object.assign(
        vm,
        {
          show: true,
          body: '',
          showCancelButton: false,
          showConfirmButton: true,
          cancel: () => {},
          confirm: () => {}
        },
        options
      )
    }

    Vue.prototype.$confirm = function(options) {
      Object.assign(
        vm,
        {
          show: true,
          body: '',
          showCancelButton: true,
          showConfirmButton: true,
          cancel: () => {},
          confirm: () => {}
        },
        options
      )
    }
  }
}
