<template>
  <transition
    :name="transitionName"
  >
    <keep-alive :include="include" :max="max">
      <router-view class="animated-route"></router-view>
    </keep-alive>
  </transition>
</template>

<script>
import Vue from 'vue'
import { fixedSwipeBack, isForward, page } from './helpers'

const pageStatus = {}
let installed = false

// 解决过场动画 IOS 侧滑问题
fixedSwipeBack(pageStatus)

export default {
  props: {
    include: {
      type: [RegExp, String],
      default: () => /cache-/
    },
    max: {
      type: [Number, String]
    }
  },
  data () {
    return {
      direction: ''
    }
  },
  computed: {
    transitionName() {
      return this.direction
        ? 'page-' + (this.direction === 'forward' ? 'in' : 'out')
        : ''
    }
  },
  mounted () {
    const self = this

    if (!installed) {
      Vue.mixin({
        beforeRouteEnter(to, from, next) {
          self.updateDirection(to, from)
          next(vm => {
            // 进入当前页面的路由时，滚动到之前的位置
            page.scrollTo(vm, to)
          })
        },
        beforeRouteLeave(to, from, next) {
          // 离开当前页面的路由时，保存页面滚动位置
          page.saveScrollTop(this, from)
          next()
        }
      })

      installed = true
    }
  },
  methods: {
    // 页面切换方向控制
    updateDirection (to, from) {
      this.direction =
          isForward(to, from)
          ? pageStatus.go ? '' : 'forward'
          : pageStatus.back ? '' : 'reverse'

      pageStatus.reset()
    }
  }
}
</script>

<style lang="postcss">
:root {
  --duration: 400ms;
}

.animated-route {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
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
  transform: translate3d(-30%, 0, 0);
}

.page-out-enter-active,
.page-in-leave-active {
  & .page-opacity-effect {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, .1);
    z-index: 10000;
  }
}

.page-in-leave {
  & .page-opacity-effect {
    opacity: 0;
  }
}

.page-in-leave-to {
  & .page-opacity-effect {
    opacity: 1;
    transition: opacity var(--duration);
  }
}

.page-out-enter {
  & .page-opacity-effect {
    opacity: 1;
  }
}

.page-out-enter-to {
  & .page-opacity-effect {
    opacity: 0;
    transition: opacity var(--duration);
  }
}
</style>
