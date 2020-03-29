<template>
  <transition name="v-modal">
    <div
      class="v-modal"
      :class="{ 'v-modal--overlay': overlay }"
      v-show="value"
      @touchmove.prevent
    >
      <div class="v-modal__wrapper" @click.self="overlayClickHandler">
        <div class="v-modal__container">
          <div class="v-modal__header" v-if="title || $slots.header">
            <slot name="header">
              <strong class="v-modal__title">{{ title }}</strong>
            </slot>
          </div>

          <div class="v-modal__content">
            <slot>
              <template v-if="content">{{ content }}</template>
              <div v-else-if="html" v-html="html"></div>
            </slot>
          </div>

          <div class="v-modal__footer">
            <slot name="footer">
              <button
                v-if="showCancelButton"
                @click="cancelHandler"
                class="btn-white"
              >
                {{ cancelText }}
              </button>
              &#12288;
              <button
                v-if="showConfirmButton"
                @click="confirmHandler"
                class="btn-info"
              >
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    },
    overlay: {
      type: Boolean,
      default: true
    },
    overlayClick: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    html: {
      type: String,
      default: ''
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cancelLoading: false,
      confirmLoading: false
    }
  },
  methods: {
    done() {
      this.$emit('input', false)
      this.cancelLoading = false
      this.confirmLoading = false
    },
    overlayClickHandler() {
      if (this.overlayClick) {
        this.$emit('close')
        this.$emit('input', false)
      }
    },
    cancelHandler() {
      this.$emit('cancel', this)
    },
    confirmHandler() {
      this.$emit('confirm', this)
    }
  }
}
</script>

<style lang="postcss">
.v-modal {
  position: fixed;
  z-index: 99998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.v-modal--overlay {
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.v-modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.v-modal__container {
  width: 70%;
  max-width: 500px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
  pointer-events: auto;
}

.v-modal__header + .v-modal__content {
  color: var(--textRegular);
}

.v-modal__content {
  margin: 20px 0;
  font-size: 16px;
  line-height: 24px;
}

.v-modal__title {
  font-size: 17px;
}

.v-modal__footer {
  text-align: right;
}

.v-modal-enter,
.v-modal-leave-active {
  opacity: 0;
}
.v-modal-enter .v-modal__container {
  transform: scale(1.1);
}
.v-modal-leave-active .v-modal__container {
  transform: scale(0.8);
}
</style>
