<template>
  <div id="app">
    <AnimatedRoute />
  </div>
</template>

<script>
import { fixedWXScroll, disabledScale } from '@/utils/page'
import AnimatedRoute from '@/components/AnimatedRoute'

export default {
  name: 'App',
  components: {
    AnimatedRoute
  },
  mounted() {
    // 解决微信上下滑出现黑底背景问题
    fixedWXScroll(this.$el, '.animated-route-view')
    // 禁止移动端双击缩放
    disabledScale()
  }
}
</script>

<style lang="postcss">
@import "./assets/css/app.css";

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

