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
  /* 滚动条宽度 */
  --scrollbarWidth: 5px;
  /* 滚动条高度 */
  --scrollbarHeight: 2px;
  /* 滚动条颜色 */
  --scrollbarColor: rgba(0,0,0,1);

  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    width: var(--scrollbarWidth);
    height: var(--scrollbarHeight);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--scrollbarColor);
    border-radius: 10px;
    visibility: hidden;
  }
  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
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

