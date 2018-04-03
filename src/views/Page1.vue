<template>
<app-view>
  <div class="page1">
    <div class="column">
      <h2>Page 1</h2>
      <br>
      <router-link :to="{ name: 'page2' }">Go to Page2</router-link>
    </div>
  </div>
</app-view>
</template>

<style lang="scss" scoped>
.page1 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  background-color: rgb(252, 221, 174);
}
.column {
  flex-direction: column;
  text-align: center;
}
</style>
