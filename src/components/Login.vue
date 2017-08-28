<template>

  <div id="app">
  </div>
</template>

<script>
import { apiEndpoint } from '../utils';

export default {
  name: 'app',
  mounted() {
    window.location.href = `${apiEndpoint}/login`
  },
  methods: {
  },
};
</script>

<style lang="scss">

#app {
  font-family: 'Noto Sans', 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
</style>
