<template>
  <div id="app">
      <div class="ui fixed inverted large secondary pointing menu" id="menu_header">
        <div class="ui container">
          <div class="menu">
            <router-link to="/" class="active" id="sparcs_logo"><img class="logo" src="./../static/logo-1@3x.png"/></router-link>
          </div>
          <div class="right menu">
            <router-link to="/aboutus" class="item" id="aboutus">ABOUT US</router-link>
            <router-link to="/projects" class="item" id="projects">PROJECTS</router-link>
            <router-link to="/seminars" class="item" id="seminars">SEMINARS</router-link>
            <router-link to="/album" class="item" id="album">ALBUM</router-link>
            <router-link to="/members" class="item" id="members">MEMBERS</router-link>
            <div class="item" @click="getLogin()">LOGIN</div>
          </div>
        </div>
      </div>
    <router-view id="r_view"></router-view>
    <div id="footer" class="ui inverted vertical footer segment">
      <div class="ui center aligned container">
        <div class="ui horizontal inverted small divided link list">
          <router-link to="/rules" class="item">회칙</router-link>
          <a class="item">만든 사람들</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data: () => ({}),

  mounted() {
    const forEach = Array.prototype.forEach;
    document.getElementById('sparcs_logo').onclick = function () {
      document.getElementById('r_view').style.marginTop = '0px';
      document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)';
    };
    document.querySelectorAll('.right.menu .item').forEach((item) => {
      item.onclick = function () {
        if (this.innerHTML !== 'ABOUT US') {
          document.getElementById('r_view').style.marginTop = '85px';
          document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)';
        }
        forEach.call(this.parentNode.children, (sibling) => {
          sibling.classList.remove('active');
        });
        this.classList.add('active');
      };
    });
    document.getElementById('sparcs_logo').onclick = function () {
      document.querySelectorAll('.right.menu .item').forEach((item) => {
        item.classList.remove('active');
      });
    };
  },
  methods: {
    getLogin() {
      console.log('hi');
      axios.get('http://localhost:8080/login')
      .then((response) => {
        console.log(response);
      });
    },
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

#sparcs_logo{
  border-color: transparent;
}

#menu_header {
  padding: 1em 1em;
  z-index: 1002;
  border: none !important;
  background-color: rgba(0,0,0,1);
}

#r_view {
  margin-top: 85px;
  flex: 1;
}

#footer{
  margin-top: 0px !important;
}

.logo {
  margin-top: 12px;
  width: 110px;
  height: 39px;
}

.masthead.segment {
  min-height: 300px;
  padding: 1em 0em;
}

.masthead h1.ui.header {
  margin-top: 1.5em;
  margin-bottom: 0em;
  font-family: 'Noto Sans';
  font-size: 3em;
  font-weight: normal;
}

.masthead h2 {
  font-family: 'Noto Sans';
  font-size: 1.7em;
  font-weight: normal;
}

.menu_list {
  border: none !important;
}

.ui.vertical.footer.segment {
  margin: 5em 0em 0em;
  padding: 2em 0em;
}

.ui.horizontal.link.list a.item {
  font-weight: bold;
  font-size: 1rem;
}
</style>
