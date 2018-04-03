<template>
<div>
  <div class="page-content">
    <slot></slot>
  </div>
  <div class="page-shadow-effect"></div>
  <div class="page-opacity-effect"></div>
</div>
</template>

<style lang="scss" scoped>
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.page-content {
  position: relative;
  height: 100%;
  overflow: auto;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
}

.page-shadow-effect {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  width: 16px; /*no*/
  z-index: -1;
  content: "";
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0.01) 50%,
    rgba(0, 0, 0, 0.2) 100%
  );
}
</style>

