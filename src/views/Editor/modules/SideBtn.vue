<template>
  <div class="side-btn" @click="toggle">
    <IconButton icon-class="icon-menu" />
  </div>
</template>

<script>
export default {
  methods: {
    toggle() {
      this.$store.commit('side/toggle')
    }
  }
}
</script>

<style lang="postcss">
.side-btn {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 6;
  display: none;
  & .icon-btn {
    font-size: 22px; /*no*/
  }
}
</style>


