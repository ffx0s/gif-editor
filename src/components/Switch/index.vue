<template>
  <input type="checkbox" class="switch" :disabled="disabled" :checked="value" @change="updateValue" />
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    updateValue() {
      this.$emit('input', !this.value)
    }
  }
}
</script>


<style lang="postcss" scoped>
.switch {
  margin: 0;
  position: relative;
  width: 42px; /*no*/
  height: 22px; /*no*/
  border: 1px solid #dfdfdf; /*no*/
  outline: 0;
  border-radius: 16px; /*no*/
  box-sizing: border-box;
  background-color: #dfdfdf;
  transition: background-color 0.1s, border 0.1s;
  -webkit-appearance: none;
  &:before {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 40px; /*no*/
    height: 20px; /*no*/
    border-radius: 15px; /*no*/
    background-color: #fdfdfd;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
  }
  &:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 20px; /*no*/
    height: 20px; /*no*/
    border-radius: 15px; /*no*/
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4); /*no*/
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  &:checked:before {
    transform: scale(0);
  }
  &:checked:after {
    transform: translateX(20px); /*no*/
  }
  &:checked {
    border-color: var(--blue);
    background-color: var(--blue);
  }
}
</style>


