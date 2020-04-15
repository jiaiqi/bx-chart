<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },
  components: {},
  mounted () {
  }
};
</script>

<style lang="scss">
@media screen and (max-width: 1366px) {
  html {
    font-size: 12px;

    overflow: hidden;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #eee;
  height: 100%;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-table tbody tr:hover > td {
  background-color: transparent !important;
}
</style>

