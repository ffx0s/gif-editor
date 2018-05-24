<template>
<div class="range-bar range-bar-style">
  <slot name="wrap"></slot>
  <div class="range-current-progress range-bar-style">
    <button class="range-button">
      <div class="text">
        <slot name="text"></slot>
      </div>
      <i class="range-point"></i>
    </button>
  </div>
</div>
</template>

<script>
import Range from '@/plugins/range'

export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    value: {
      type: Number,
      default: 0
    }
  },
  watch: {
    max(value) {
      this._range.setMax(value)
    },
    value(value) {
      this._range.setValue(value)
    }
  },
  mounted() {
    this.initRange()
  },
  methods: {
    initRange() {
      const vm = this

      vm._range = new Range({
        el: vm.$el,
        max: vm.max || 10,
        min: vm.min,
        value: vm.value
      })

      vm._range.handler.on('change', value => {
        vm.$emit('on-change', value)
      })

      vm._range.handler.on('dragstart', () => {
        vm.$emit('on-dragstart')
      })
    }
  }
}
</script>


<style lang="postcss" scoped>
.range-bar-style {
  width: 100%;
  height: 2px; /*no*/
  background: rgba(255, 255, 255, 0.5);
  border-radius: 3px; /*no*/
}
.range-bar {
  position: relative;
  & .range-button {
    position: absolute;
    width: 35px;
    height: 35px;
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    cursor: pointer;
    top: -19px;
    right: -26px;
    & .range-point {
      margin: 4px auto 0;
      width: 17px;
      height: 17px;
      display: block;
      background: white;
      border-radius: 50%;
    }
  }
  & .range-current-progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    background: rgba(255, 255, 255, 0.8);
  }
  & .text {
    position: absolute;
    top: -7px;
    left: -15px;
    width: 68px;
    text-align: center;
    letter-spacing: 1px; /*no*/
    & strong {
      font-weight: bold;
    }
  }
}
</style>

