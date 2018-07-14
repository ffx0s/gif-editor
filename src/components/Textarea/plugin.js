import Textarea from './'

export default {
  install: Vue => {
    const _Textarea = Vue.extend({
      render: function(createElement) {
        const that = this

        return createElement(Textarea, {
          on: {
            input: value => {
              that.value = value
            },
            'update:show': value => (that.show = value),
            'on-confirm': that.onConfirm
          },
          props: {
            show: that.show,
            value: that.value
          }
        })
      },
      data() {
        return {
          show: false,
          value: '',
          onConfirm: () => {}
        }
      },
      componetms: {
        Textarea
      }
    })

    // 创建实例
    const vm = new _Textarea({
      el: document.createElement('div')
    })

    // 插入文档
    document.body.appendChild(vm.$el)

    // 调用接口
    Vue.prototype.$textarea = function(options) {
      Object.assign(
        vm,
        {
          show: true,
          value: '',
          onConfirm: () => {}
        },
        options
      )
    }
  }
}
