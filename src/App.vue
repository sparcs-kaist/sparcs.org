<template>
  <div id="app">
    <div class="ui inverted attached basic segment">
      <div class="ui inverted large secondary pointing menu">
        <div class="menu">
          <router-link to="/" class="active item" id="sparcs_logo">SPARCS</router-link>
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
  data() {
    return {

    }
  },
  methods: {
    showLogin() {

    },
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#sparcs_logo{
  border-color: transparent;
}

.login_indicator{
  margin: 10px;
}
</style>
