<template>
  <div id="app">
      <div class="ui fixed inverted large secondary pointing menu" id="menu_header">
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
    <router-view id="r_view" style="margin-top: 85px;"></router-view>
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
        if(this.innerHTML === 'ABOUT US'){
          document.getElementById('r_view').style.marginTop = '0px';
          document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)';
        }
        else{
          document.getElementById('r_view').style.marginTop = '85px';
          document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)';
        }
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
  font-family: 'Noto Sans', 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.logo {
  margin-top: 12px;
  width: 110px;
  height: 39px;
}

h1, h2{
  font-family: 'Noto Sans';
}

#menu_header {
  padding: 1em 1em;
  z-index: 1;
  border: none !important;
  background-color: rgba(0,0,0,1);
}

.menu_list {
  border: none !important;
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
