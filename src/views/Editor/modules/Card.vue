<template>
  <div class="card">
    <div class="link" :title="name">
      <img v-if="lazy" v-lazy="url" :alt="name" />
      <img v-else :src="url | setImg" :alt="name">
      <slot />
    </div>
    <slot name="wrap" />
  </div>
</template>

<script>
export default {
  props: {
    lazy: {
      type: Boolean,
      default: true
    },
    to: Object,
    url: String,
    name: String
  },
  data() {
    return {}
  }
}
</script>

<style lang="postcss" scoped>
.card {
  position: relative;
  box-sizing: border-box;
  & .link {
    display: block;
    padding-bottom: 100%;
    height: 0;
  }
  & img {
    display: block;
    max-width: 100%;
    font-size: 14px; /*no*/
    backface-visibility: hidden;
    color: var(--black);
  }
}
</style>
