<template>
<div>
  <div class="color-picker range-bar range-bar-style" :style="wrapStyle">
    <ul class="color-picker-colors">
      <li v-for="color in colors" :key="color" :style="{backgroundColor: color, width: itemSize + 'px'}"></li>
    </ul>
    <div class="range-current-progress range-bar-style">
      <button class="range-button">
        <i class="color-picker-point range-point" :style="{backgroundColor: colors[colorValue]}"></i>
      </button>
    </div>
  </div>
  <div class="alpha-picker range-bar range-bar-style" :style="wrapStyle">
    <div class="alpha-picker-color" :style="alphaStyle"></div>
    <div class="range-current-progress range-bar-style">
      <button class="range-button">
        <i class="range-point"></i>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import Range from '@/plugins/range'

const colors = [
  '#000000',
  '#333333',
  '#4D4D4D',
  '#666666',
  '#808080',
  '#999999',
  '#B3B3B3',
  '#CCCCCC',
  '#FFFFFF',
  '#9F0500',
  '#D33115',
  '#F44E3B',
  '#C45100',
  '#E27300',
  '#FE9200',
  '#FB9E00',
  '#FCC400',
  '#FCDC00',
  '#808900',
  '#B0BC00',
  '#DBDF00',
  '#194D33',
  '#68BC00',
  '#A4DD00',
  '#0C797D',
  '#16A5A5',
  '#68CCCA',
  '#0062B1',
  '#009CE0',
  '#73D8FF',
  '#653294',
  '#7B64FF',
  '#AEA1FF',
  '#AB149E',
  '#FA28FF',
  '#FDA1FF'
]

export default {
  props: {
    colors: {
      type: Array,
      default: () => colors
    },
    itemSize: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: colors.length - 1
    },
    colorValue: {
      type: Number,
      default: 0
    },
    alphaValue: {
      type: Number,
      default: 1
    }
  },
  computed: {
    wrapStyle() {
      return {
        width: this.colors.length * this.itemSize + 'px'
      }
    },
    alphaStyle() {
      return {
        background: `linear-gradient(to right, rgba(0,0,0,0) 0%, ${
          this.colors[this.colorValue]
        } 100%)`
      }
    }
  },
  watch: {
    max(value) {
      this._colorPicker.setMax(value)
    },
    colorValue(value) {
      this._colorPicker.setValue(value)
    },
    alphaValue(value) {
      this._alphaPicker.setValue(value)
    }
  },
  mounted() {
    this.initRange()
  },
  methods: {
    initRange() {
      const vm = this

      vm._colorPicker = new Range({
        el: vm.$el.querySelector('.color-picker'),
        max: vm.max,
        min: vm.min,
        value: vm.colorValue
      })

      vm._colorPicker.handler.on('change', value => {
        vm.$emit('on-change-color', this.colors[value], value)
      })

      vm._alphaPicker = new Range({
        el: vm.$el.querySelector('.alpha-picker'),
        max: 1,
        min: 0,
        step: 0.01,
        value: vm.alphaValue
      })

      vm._alphaPicker.handler.on('change', value => {
        vm.$emit('on-change-alpha', value)
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.range-bar-style {
  margin: 0 auto;
  width: 100%;
  height: 6px; /*no*/
  border-radius: 3px; /*no*/
}
.range-bar {
  position: relative;
  & .range-button {
    position: absolute;
    top: -16px;
    right: -28px;
    width: 36px;
    height: 36px;
    background: transparent;
    border: none;
    color: white;
    padding: 0;
    cursor: pointer;
    & .range-point {
      margin: 0 auto;
      width: 19px;
      height: 19px;
      display: block;
      background: white;
      border-radius: 50%;
      box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 2px 0px;
      border: 2px solid rgba(0, 0, 0, 0);
      box-sizing: border-box;
    }
  }
  & .range-current-progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
  }
}
.color-picker {
  margin-bottom: 30px;
  & .color-picker-point {
    transition: background 0.3s;
  }
}
.color-picker-colors {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  font-size: 0;
  & li {
    display: inline-block;
    width: 8px; /*no*/
    height: 100%;
  }
  & li:first-child {
    border-radius: 3px 0 0 3px;
  }
  & li:last-child {
    border-radius: 0 3px 3px 0;
  }
}
.alpha-picker {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")
    left center;
  background-size: contain;
}
.alpha-picker-color {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: background 0.3s;
}
</style>
