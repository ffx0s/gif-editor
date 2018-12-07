<template>
<transition name="fade">
  <div class="textarea-input item-center" v-show="show">
    <form @submit.prevent="confirm">
      <input
        class="textarea" 
        placeholder="点击输入文字"
        :value="value"
        @input="updateValue($event.target.value)"
        autofocus
      />
    </form>
    <div class="footer-actions">
      <button @click.stop="cancle">取消</button>
      <button @click.stop="confirm">确定</button>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    clearValue: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    cancle() {
      this.reset()
    },
    confirm() {
      this.$emit('on-confirm', this.value)
      this.reset()
    },
    reset() {
      this.$emit('update:show', false)

      if (this.clearValue) {
        setTimeout(() => {
          this.$emit('input', '')
        }, 300)
      }
    },
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>


<style lang="postcss" scoped>
.textarea-input {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: var(--black);
}
.textarea {
  margin-top: -200px;
  width: 300px;
  height: 200px;
  background: transparent;
  color: white;
  border: none;
  padding: 0;
  font-size: 18px;
  text-align: center;
  resize: none;
}
.footer-actions {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  line-height: 50px;
  & button {
    display: block;
    width: 70px;
    height: 100%;
    font-size: 16px;
    color: white;
    background: transparent;
    border: none;
    padding: 0;
  }
}
</style>

