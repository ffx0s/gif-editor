<template>
<div>
  <div class="animated-route-view" :class="this.scroll ? '__scroll' : '__hidden'">
    <slot></slot>
  </div>
  <div class="page-shadow-effect"></div>
  <div class="page-opacity-effect"></div>
</div>
</template>

<script>
export default {
  props: {
    scroll: {
      type: Boolean,
      required: false,
      default: true
    }
  }
}
</script>

<style lang="postcss">
.animated-route-view {
  position: relative;
  height: 100%;
  z-index: 1;
  &.__scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  &.__hidden {
    overflow: hidden;
  }
}

.page-shadow-effect {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  width: 16px; /*no*/
  z-index: -1;
  content: "";
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.01) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
</style>

