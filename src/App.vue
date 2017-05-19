<template>
  <div id="app">
    <div class="ui inverted attached basic segment">
      <div class="ui inverted large secondary pointing menu">
        <div class="menu">
          <router-link to="/" class="active item" id="sparcs_logo"><img src="./../static/logo-1@3x.png" style="transform: scale(2); margin-left: 15px;"/></router-link>
        </div>
        <div class="right menu">
          <router-link to="/aboutus" class="item">About Us</router-link>
          <router-link to="/projects" class="item">Projects</router-link>
          <router-link to="/seminars" class="item">Seminars</router-link>
          <router-link to="/album" class="item">Album</router-link>
          <router-link to="/members" class="item">Members</router-link>
          <router-link to="/" class="item">Login</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'app',
  components: {
  },
  methods: {
  },
  mounted() {
    $(window.document).ready(() => {
      $('.ui.secondary.pointing.menu a.item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
      $('#sparcs_logo').on('click', () => { $('.right.menu a.item').removeClass('active') })
      // $('.ui.dropdown').dropdown()
    })
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Noto Sans', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#sparcs_logo{
  border-color: transparent;
}
.masthead.segment {
  min-height: 300px;
  padding: 1em 0em;
}
.masthead h1.ui.header {
  margin-top: 1.5em;
  margin-bottom: 0em;
  font-size: 3em;
  font-weight: normal;
}
.masthead h2 {
  font-size: 1.7em;
  font-weight: normal;
}
</style>
