<template>
  <div class="scroll-list">
    <slot />
  </div>
</template>

<script>
import {
  addListener,
  removeListener,
  getScrollEventTarget
} from '@/utils/shared'

export default {
  props: {
    // loading
    value: {
      type: Boolean,
      default: false
    },
    finished: {
      type: Boolean,
      default: false
    },
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      bound: false
    }
  },
  mounted() {
    this._scroller = getScrollEventTarget(this.$el)
    if (this.immediateCheck) this.$emit('load')
    this.bind()
  },
  beforeDestroy() {
    this.unbind()
  },
  methods: {
    bind() {
      if (!this.bound) {
        addListener(
          this._scroller,
          'scroll',
          (this.onscroll = this.onscroll.bind(this))
        )
        this.bound = true
      }
    },
    unbind() {
      removeListener(this._scroller, 'scroll', this.onscroll)
      this.bound = false
    },
    allow() {
      const scroller = this._scroller
      if (this.finished || this.value) return false
      return (
        scroller.scrollHeight -
          scroller.scrollTop -
          scroller.getBoundingClientRect().height <=
        this.offset
      )
    },
    onscroll() {
      if (this.allow()) {
        this.$emit('load')
      }
    }
  }
}
</script>
