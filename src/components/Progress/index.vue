<template>
<transition name="fade">
  <div class="progress">
    <div class="progress-bar" :style="{width: progress + '%'}">{{text}} {{progress}}%</div>
  </div>
</transition>
</template>

<script>
export default {
  computed: {
    progress() {
      return Math.ceil(this.value / this.max * 100)
    }
  },
  props: {
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.progress {
  width: 100%;
  height: 20px;
  line-height: 20px;
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  & .progress-bar {
    width: 0;
    height: 100%;
    background: var(--blue);
    text-align: center;
    color: white;
    font-size: 12px;
    white-space: nowrap;
    text-indent: 8px;
  }
}
</style>
