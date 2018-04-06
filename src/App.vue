<template>
  <div id="app">
    <!-- route.meta.keepAlive 为 true 则缓存页面 -->
    <transition
      :name="transitionName"
    >
      <keep-alive>
        <router-view class="page-view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- route.meta.keepAlive 为 false 则不会缓存页面 -->
    <transition
      :name="transitionName"
    >
      <router-view class="page-view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fixedWXScroll } from '@/util'

export default {
  name: 'App',
  computed: {
    ...mapGetters({
      direction: 'direction'
    }),
    transitionName() {
      return this.direction
        ? 'page-' + (this.direction === 'forward' ? 'in' : 'out')
        : ''
    }
  },
  mounted() {
    // 解决微信上下滑出现黑底背景问题
    fixedWXScroll(this.$el, '.page-content')
  }
}
</script>

<style lang="postcss">
@import "./assets/css/app";

:root {
  --duration: 400ms;
}

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
  & a {
    color: white;
  }
}

.page-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.page-out-enter-active,
.page-out-leave-active,
.page-in-enter-active,
.page-in-leave-active {
  will-change: transform;
  transition: transform var(--duration);
  backface-visibility: hidden;
  perspective: 1000;
}

.page-out-leave,
.page-out-leave-to {
  z-index: 2;
}

.page-out-leave,
.page-out-enter-to,
.page-in-leave,
.page-in-enter-to {
  transform: translate3d(0, 0, 0);
}

.page-out-leave-to,
.page-in-enter {
  transform: translate3d(100%, 0, 0);
}

.page-out-enter,
.page-in-leave-to {
  transform: translate3d(-20%, 0, 0);
}

.page-out-enter-active,
.page-in-leave-active {
  &.page-opacity-effect {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 10000;
  }
}

.page-in-leave {
  &.page-opacity-effect {
    opacity: 0;
  }
}

.page-in-leave-to {
  &.page-opacity-effect {
    opacity: 1;
    transition: opacity var(--duration);
  }
}

.page-out-enter {
  &.page-opacity-effect {
    opacity: 1;
  }
}

.page-out-enter-to {
  &.page-opacity-effect {
    opacity: 0;
    transition: opacity var(--duration);
  }
}
</style>

