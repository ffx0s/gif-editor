<template>
<app-view>
  <div class="page1">
    <div class="column">
      <h2>Page 1</h2>
      <br>
      <ul>
        <li class="f-bd-top" v-for="value in data" :key="value">{{value}}</li>
      </ul>
      <router-link :to="{ name: 'page2' }">Go to Page2</router-link>
    </div>
  </div>
</app-view>
</template>

<script>
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    let num = 100
    let data = []
    while (num > 0) {
      data.push(num)
      num--
    }
    this.data = data
  }
}
</script>

<style lang="postcss" scoped>
.page1 {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  color: white;
  background-color: rgb(252, 221, 174);
}
.column {
  flex-direction: column;
  text-align: center;
}
</style>
