<template>

  <div id="app">
    <div class="ui fixed inverted large secondary pointing menu" id="menu_header" v-if="$route.path==='/' ? false : true">
      <div id="rightResponsibleMenu" class="ui right sidebar inverted vertical menu">
        <router-link to="/aboutus" class="item" id="aboutus" v-on:click.native="sparcs_logo_onclick($event)">ABOUT US</router-link>
        <router-link to="/projects" class="item" id="projects" v-on:click.native="right_menu_onclick($event)">PROJECTS</router-link>
        <router-link to="/seminars" class="item" id="seminars" v-on:click.native="right_menu_onclick($event)">SEMINARS</router-link>
        <router-link to="/album" class="item" id="album" v-on:click.native="right_menu_onclick($event)">ALBUM</router-link>
        <router-link to="/members" class="item" id="members" v-on:click.native="right_menu_onclick($event)">MEMBERS</router-link>
        <div v-if=authenticated class="item" @click="logout">LOGOUT</div>
        <div v-else class="item" @click="login">LOGIN</div>
      </div>
      <div class="ui container">
        <div class="menu">
          <router-link to="/aboutus" class="active" id="sparcs_logo" v-on:click.native="sparcs_logo_onclick($event)">
            <img class="logo" src="./../static/logo-1@3x.png"/></router-link>
        </div>

        <div class="right menu">
          <router-link to="/aboutus" class="item" id="aboutus" v-on:click.native="sparcs_logo_onclick($event)">ABOUT US</router-link>
          <router-link to="/projects" class="item" id="projects" v-on:click.native="right_menu_onclick($event)">PROJECTS</router-link>
          <router-link to="/seminars" class="item" id="seminars" v-on:click.native="right_menu_onclick($event)">SEMINARS</router-link>
          <router-link to="/album" class="item" id="album" v-on:click.native="right_menu_onclick($event)">ALBUM</router-link>
          <router-link to="/members" class="item" id="members" v-on:click.native="right_menu_onclick($event)">MEMBERS</router-link>
          <div v-if="authenticated" class="item" @click="logout">LOGOUT</div>
          <div v-else class="item" @click="login">LOGIN</div>
        </div>
        <div class="hamburger" @click="menu_clicked()">
          <i class="sidebar icon" style="color:white"></i>
        </div>
      </div>
    </div>

    <router-view id="r_view"  ></router-view>

    <div id="footer" class="ui inverted vertical footer segment" v-if="$route.path==='/' ? false : true">
      <div class="ui center aligned container">
        <div class="ui horizontal inverted small divided link list">
          <router-link to="/rules" class="item">회칙</router-link>
          <a class="item">만든 사람들</a>
          <router-link to="/admin" class="item">관리자</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiEndpoint, getSession } from './utils'

export default {
  name: 'app',
  data: () => ({
    menuShow: false,
  }),
  computed: {
    authenticated() {
      return getSession('authenticated');
    },
  },
  updated() {
    const parser = document.createElement('a')
    parser.href = window.location.href
  },
  methods: {
    login() {
      window.location.href = `${apiEndpoint}/login`
    },
    logout() {
      window.location.href = `${apiEndpoint}/logout`
    },
    sparcs_logo_onclick() {
      console.log('sparcs_logo');
      document.getElementById('r_view').style.marginTop = '0px'
      document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,0)'
      document.querySelectorAll('.right.menu .item').forEach((item) => {
        item.classList.remove('active')
      })
      const width = $(window).width();
      if (width <= 600) {
        $('.ui.sidebar')
          .sidebar('setting', 'transition', 'overlay')
          .sidebar('toggle')
          ;
      }
    },
    right_menu_onclick(event) {
      console.log(event);
      const obj = event.target;
      const forEach = Array.prototype.forEach;
      console.log(obj.innerHTML);
      if (obj.innerHTML !== 'ABOUT US') {
        const width = $(window).width();
        if (width <= 600) {
          document.getElementById('r_view').style.marginTop = '49px';
          $('.ui.sidebar')
            .sidebar('setting', 'transition', 'overlay')
            .sidebar('toggle')
            ;
        } else {
          document.getElementById('r_view').style.marginTop = '85px';
        }
        document.getElementById('menu_header').style.backgroundColor = 'rgba(0,0,0,1)';
      }
      forEach.call(obj.parentNode.children, (sibling) => {
        sibling.classList.remove('active')
      })
      obj.classList.add('active')
    },
    menu_clicked() {
      $('.ui.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle')
        ;
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
  z-index: 1300;
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
.ui.vertical.footer.segment {
  margin: 5em 0em 0em;
  padding: 2em 0em;
}
.ui.horizontal.link.list a.item {
  font-weight: bold;
  font-size: 1rem;
}

.ui.vertical.inverted.sidebar.menu.right,
.hamburger {
  display: none;
}

@media (max-width: 600px) {

  .ui.sidebar {
    transition: overlay 0.5s;
  }

  .ui.vertical.inverted.sidebar.menu.right,
  .hamburger {
    display: block !important;
    z-index: 700;
  }

  .menu {
    width: 100%;
  }

  #menu_header {
    position: fixed;
  }

  #sparcs_logo {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -40%);
  }

  .ui.container .right.menu {
    display: none !important;
  }

}
</style>
