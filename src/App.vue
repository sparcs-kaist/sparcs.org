<template>
  <div id="app">
    <div class="ui inverted attached basic segment menu_header">
      <div class="ui inverted large secondary pointing menu menu_list">
      <div class="ui container">
        <div class="menu">
          <router-link to="/" class="active" id="sparcs_logo"><img class="logo" src="./../static/logo.png"/></router-link>
        </div>
        <div class="right menu">
          <router-link to="/aboutus" class="item">ABOUT US</router-link>
          <router-link to="/projects" class="item">PROJECTS</router-link>
          <router-link to="/seminars" class="item">SEMINAR</router-link>
          <router-link to="/album" class="item">ALBUM</router-link>
          <router-link to="/members" class="item">MEMBERS</router-link>
          <router-link to="/" class="item">LOGIN</router-link>
        </div>
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
  data() {
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
  font-family: 'Noto Sans' !important;
}

.logo {
  margin-top: 12px;
  width: 110px;
  height: 39px;
}

h1, h2{
  font-family: 'Noto Sans';
}
.menu_header {
  position: fixed !important;
  z-index: 1;
  border: none !important;
  background-color: rgba(0,0,0,0) !important; 
}

.menu_list {
  border: none !important;
}

#app {
  font-family: 'Noto Sans', 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#sparcs_logo{
  border-color: transparent;
}
.masthead.segment {
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
