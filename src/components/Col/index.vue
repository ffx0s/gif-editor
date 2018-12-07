<template>
  <div class="col" :class="['col-' + span, 'col-' + layout]" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [String, Number],
      default: 6
    },
    layout: {
      type: String,
      default: 'float' // float | inline-block
    }
  },
  computed: {
    gutter () {
      return (this.$parent && Number(this.$parent.gutter)) || 0
    },
    style () {
      const padding = `${this.gutter / 2}px`
      return this.gutter ? { paddingLeft: padding, paddingRight: padding } : {}
    }
  }
}
</script>

<style lang="postcss">
.col-float {
  float: left;
  box-sizing: border-box;
}
.col-inline-block {
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}
.col-6 {
  width: 25%;
}
.col-12 {
  width: 50%;
}
</style>
