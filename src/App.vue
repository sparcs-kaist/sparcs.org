<template>
  <div id="app">
    <div class="ui huge secondary pointing menu">

      <div class="menu">
        <router-link to="/" class="active item" id="sparcs_logo">SPARCS</router-link>
      </div>

      <div class="right menu">
        <router-link to="/members" class="item">Members</router-link>
        <router-link to="/photos" class="item">Photos</router-link>
        <router-link to="/seminar" class="item">Seminar</router-link>
        <router-link to="/mail" class="item">Mail</router-link>
        <!--<div class="ui pointing dropdown item" >-->
          <!--Log In-->
          <!--<div class="menu">-->
            <!--<h4 class="login_indicator">Username</h4>-->
            <!--<div class="ui input">-->
              <!--<input type="text" name="search" placeholder="Search issues...">-->
            <!--</div>-->
            <!--<h4 class="login_indicator">Password</h4>-->
            <!--<div class="ui search icon input">-->
              <!--<i class="search icon"></i>-->
              <!--<input type="text" name="search" placeholder="Search issues...">-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'app',
    components:{
    },
    data () {
      return {

      }
    },
    methods:{
      showLogin: function(){

      }
    },
    mounted: function(){
      $(document).ready(function(){
        $('.ui.secondary.pointing.menu a.item').on('click', function(){
          $(this).addClass('active').siblings().removeClass('active');
        });
        $('#sparcs_logo').on('click', function(){
          $('.right.menu a.item').removeClass('active');
        });
        $('.ui.dropdown').dropdown();
      });

    }
  }
</script>

<style>
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
