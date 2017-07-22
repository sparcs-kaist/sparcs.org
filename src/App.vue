<template>
  <div id="app">
    <div class="ui fixed inverted large secondary pointing menu" id="menu_header" v-if="$route.path==='/' ? false : true">
      <div class="ui container">
        <div class="menu">
          <router-link to="/aboutus" class="active" id="sparcs_logo" v-on:click.native="sparcs_logo_onclick($event)"><img class="logo" src="./../static/logo-1@3x.png"/></router-link>
        </div>
        <div class="right menu">
          <router-link to="/aboutus" class="item" id="aboutus" v-on:click.native="sparcs_logo_onclick($event)">ABOUT US</router-link>
          <router-link to="/projects" class="item" id="projects" v-on:click.native="right_menu_onclick($event)">PROJECTS</router-link>
          <router-link to="/seminars" class="item" id="seminars" v-on:click.native="right_menu_onclick($event)">SEMINARS</router-link>
          <router-link to="/album" class="item" id="album" v-on:click.native="right_menu_onclick($event)">ALBUM</router-link>
          <router-link to="/members" class="item" id="members" v-on:click.native="right_menu_onclick($event)">MEMBERS</router-link>
          <div v-if=authenticated class="item" @click="logout">LOGOUT</div>
          <div v-else class="item" @click="login">LOGIN</div>
        </div>
      </div>
    </div>
    <router-view id="r_view"></router-view>
    <div id="footer" class="ui inverted vertical footer segment" v-if="$route.path==='/' ? false : true">
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
// import { getSession } from './utils'

export default {
  name: 'app',
  data: () => ({}),
  computed: {
    // authenticated() {
    //   return getSession('authenticated')
    // },
  },
  updated() {
    // $(window.document).ready(() => {
    const parser = document.createElement('a')
    parser.href = window.location.href
    console.log(parser.pathname);
    // if (parser.pathname !== '/') {
    //   const forEach = Array.prototype.forEach;
    //   document.getElementById('sparcs_logo').onclick = function () {
    //     console.log('sparcs_logo');
    //     document.getElementById('r_view').style.marginTop = '0px'
    //     document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)'
    //     document.querySelectorAll('.right.menu .item').forEach((item) => {
    //       item.classList.remove('active')
    //     })
    //   }
    //   document.querySelectorAll('.right.menu .item').forEach((item) => {
    //     item.onclick = function () {
    //       console.log('hey');
    //       if (this.innerHTML !== 'ABOUT US') {
    //         document.getElementById('r_view').style.marginTop = '85px'
    //         document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)'
    //       }
    //       forEach.call(this.parentNode.children, (sibling) => {
    //         sibling.classList.remove('active')
    //       })
    //       this.classList.add('active')
    //     }
    //   })
    // }
    // });
  },
  methods: {
    login() {
      window.location.href = 'http://localhost:8080/login'
    },
    logout() {
      window.location.href = 'http://localhost:8080/logout'
    },
    sparcs_logo_onclick() {
      console.log('sparcs_logo');
      document.getElementById('r_view').style.marginTop = '0px'
      document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)'
      document.querySelectorAll('.right.menu .item').forEach((item) => {
        item.classList.remove('active')
      })
    },
    right_menu_onclick(event) {
      console.log(event);
      const obj = event.target;
      const forEach = Array.prototype.forEach;
      console.log(obj.innerHTML);
      if (obj.innerHTML !== 'ABOUT US') {
        document.getElementById('r_view').style.marginTop = '85px'
        document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)'
      }
      forEach.call(obj.parentNode.children, (sibling) => {
        sibling.classList.remove('active')
      })
      obj.classList.add('active')
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
