<template>
<app-view>
  <div class="page3">
    <div class="column">
      <h2>Page 3</h2>
      <br>
      <a @click="back()">Back to Page1</a>
    </div>
  </div>
</app-view>
</template>

<script>
export default {
  methods: {
    back() {
      if (history.length > 2) {
        history.go(-2)
      } else {
        this.$router.push({ name: 'page1' })
      }
    }
  }
}
</script>


<style lang="postcss" scoped>
.page3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  background-color: rgb(134, 155, 116);
}
.column {
  flex-direction: column;
  text-align: center;
}
</style>
