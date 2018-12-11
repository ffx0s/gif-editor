<template>
<AppView>
  <div class="home" @touchmove.prevent>
    <div class="actions item-center">
      <button class="btn-white btn-large btn-block focus making">
        上传制作
        <Upload @on-change="onChange"></Upload>
      </button>
    </div>
  </div>
</AppView>
</template>

<script>
import Upload from '@/components/Upload'

export default {
  name: 'cache-home',
  methods: {
    onChange() {
      this.$router.push({
        name: 'editor'
      })
    }
  },
  components: {
    Upload
  }
}
</script>

<style lang="postcss" scoped>
.home {
  height: 100%;
  background: var(--blue) url("./images/bg.jpg") no-repeat center;
  background-size: cover;
  touch-action: none;
}

.actions {
  width: 100%;
  height: 100%;
  flex-direction: column;
  & .making {
    position: relative;
    margin-bottom: 25px;
  }
  & .btn-large {
    width: 200px;
  }
}
</style>

