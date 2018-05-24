<template>
<button class="icon-btn" :class="{'active': isActive}" @click="onClick" @touchend.stop>
  <i class="iconfont" :class="iconClass"></i>
</button>
</template>

<script>
export default {
  props: {
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    onClick() {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
      }, 450)
    }
  }
}
</script>


<style lang="postcss" scoped>
.icon-btn {
  width: 35px;
  height: 35px;
  padding: 0;
  cursor: pointer;
  color: white;
  border: none;
  background: transparent;
  & i {
    display: inline-block;
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
}

.icon-btn.active i {
  animation-name: icon-animate;
  animation-duration: 0.4s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
}

@keyframes icon-animate {
  50% {
    opacity: 0.3;
    transform: scale(1.6) translateZ(0);
  }
}
</style>
