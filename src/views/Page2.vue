<template>
<app-view>
  <div class="page2">
    <div class="column">
      <h2>Page 2</h2>
      <br>
      <router-link :to="{ name: 'page3' }">Go to Page3</router-link>
    </div>
  </div>
</app-view>
</template>

<style lang="postcss" scoped>
.page2 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  background-color: rgb(255, 184, 108);
}
.column {
  flex-direction: column;
  text-align: center;
}
</style>
