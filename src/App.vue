<template>
  <div id="app">
    <!-- route.meta.keepAlive 为 true 则缓存页面 -->
    <transition
      :name="transitionName"
    >
      <keep-alive>
        <router-view class="view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <!-- route.meta.keepAlive 为 false 则不会缓存页面 -->
    <transition
      :name="transitionName"
    >
      <router-view class="view" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
  }
}
</script>

<style lang="scss">
@import "./assets/scss/app";

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
  a {
    color: white;
  }
}

$duration: 400ms;

.page-out-enter-active,
.page-out-leave-active,
.page-in-enter-active,
.page-in-leave-active {
  will-change: transform;
  transition: transform $duration;
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
  .page-opacity-effect {
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
  .page-opacity-effect {
    opacity: 0;
  }
}

.page-in-leave-to {
  .page-opacity-effect {
    opacity: 1;
    transition: opacity $duration;
  }
}

.page-out-enter {
  .page-opacity-effect {
    opacity: 1;
  }
}

.page-out-enter-to {
  .page-opacity-effect {
    opacity: 0;
    transition: opacity $duration;
  }
}

// #app {
//   max-width: 750px; /*no*/
//   margin: 0 auto;
// }
</style>
