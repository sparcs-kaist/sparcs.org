<template>
  <div id="app">
    <div class="ui inverted attached basic segment">
      <div class="ui inverted large secondary pointing menu">
        <div class="menu">
          <router-link to="/" class="active item" id="sparcs_logo">SPARCS</router-link>
        </div>
        <div class="right menu" id="navbar">
          <router-link to="/aboutus" class="item" id="aboutus">About Us</router-link>
          <router-link to="/projects" class="item" id="projects">Projects</router-link>
          <router-link to="/seminars" class="item" id="seminars">Seminars</router-link>
          <router-link to="/album" class="item" id="album">Album</router-link>
          <router-link to="/members" class="item" id="members">Members</router-link>
          <router-link to="/" class="item">Login</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data: () => ({}),

  methods: {},

  mounted: function () {
    const forEach = Array.prototype.forEach;
    document.querySelectorAll('.right.menu .item').forEach(item => {
      item.onclick = function () {
        forEach.call(this.parentNode.children, sibling => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });
    document.getElementById('sparcs_logo').onclick = function () {
      document.querySelectorAll('.right.menu .item').forEach(item => {
        item.classList.remove('active');
      });
    };
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
