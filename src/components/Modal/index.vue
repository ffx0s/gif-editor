<template>
<transition name="modal">
  <div class="modal-mask" @touchmove.prevent>
    <div class="modal-wrapper">
      <div class="modal-container">

        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button
              v-show="showConfirmButton"
              class="modal-default-button btn-info"
              @click="$emit('confirm')"
            >
              确定
            </button>
            <button
              v-show="showCancelButton"
              class="modal-default-button btn-white"
              @click="$emit('cancel')"
            >
              取消
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    showCancelButton: {
      type: Boolean,
      default: false
    }
  }
}
</script>


<style lang="postcss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  max-width: 500px; /*no*/
  margin: 0px auto;
  padding: 20px 30px; /*no*/
  background-color: #fff;
  border-radius: 2px; /*no*/
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); /*no*/
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0; /*no*/
  line-height: 24px; /*no*/
}

.modal-footer {
  padding-bottom: 34px; /*no*/
}

.modal-default-button {
  float: right;
  margin-left: 15px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(1.1);
}
</style>
