<template>
  <div class="row" :style="style">
    <slot />
  </div>
</template>

<script>
export default {
  props: ['gutter'],
  data() {
    const margin = `-${this.gutter / 2}px`
    return {
      style: {
        marginLeft: margin,
        marginRight: margin
      }
    }
  }
}
</script>

<style lang="postcss">
.row {
  position: relative;
  box-sizing: border-box;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
