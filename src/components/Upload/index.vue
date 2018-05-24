<template>
<div class="upload">
  <input @change="onChange" class="upload-input" type="file" accept="image/gif">
</div>
</template>

<script>
export default {
  methods: {
    check(file, maxSize = 3000 * 1024) {
      const vm = this
      if (file.size > maxSize) {
        vm.$alert({ body: `请上传小于 ${maxSize / 1024 / 1000}M 的图片。` })
        return false
      }
      // if (file.type !== 'image/gif') {
      //   vm.$alert({ body: '仅支持 GIF 图。' })
      //   return false
      // }
      return true
    },
    onChange(e) {
      const file = e.target.files[0]

      if (!file || !this.check(file)) return

      this.$store.commit('file', file)
      this.$emit('on-change', file)
      e.target.value = ''
    }
  }
}
</script>


<style lang="postcss" scoped>
.upload {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.upload-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 5;
}
</style>

