<template>
<div @touchmove.stop="() => {}" class="scroll-view" :class="this.scrollX ? 'x' : 'y'">
  <template v-if="this.scrollX">
    <div :style="{ width: this.maxWidth + 'px' }">
      <div class="left">
        <slot></slot>
      </div>
    </div>
  </template>
  <template v-else>
    <slot></slot>
  </template>
</div>
</template>

<script>
export default {
  props: {
    maxWidth: {
      type: Number,
      required: false,
      default: 5000
    },
    scrollX: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="postcss" scoped>
.scroll-view {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  &.x {
    overflow-x: auto;
    overflow-y: hidden;
  }
  &.y {
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.left {
  float: left;
}
</style>

