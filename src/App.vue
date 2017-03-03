<template>
  <div id="app">
    <div class="ui secondary pointing menu">
      <div class="menu">
        <a id="sparcs_logo" class="active item" @click="routing = 'Home'">
          SPARCS
        </a>

      </div>
      <div class="right menu">
        <a id="menu_item" class="item" @click="routing = 'Member'">
          Member
        </a>
        <a id="menu_item" class="item" @click="routing = 'Photo'">
          Photo
        </a>
        <a id="menu_item" class="item" @click="routing = 'Seminar'">
          Seminar
        </a>
        <a id="menu_item" class="item" @click="routing = 'Mail'">
          Mail
        </a>
        <div class="ui pointing dropdown item" >
          Log In
          <div class="menu">
            <h4 id="login_indicator">Username</h4>
            <div class="ui input">
              <input type="text" name="search" placeholder="Search issues...">
            </div>
            <h4 id="login_indicator">Password</h4>
            <div class="ui search icon input">
              <i class="search icon"></i>
              <input type="text" name="search" placeholder="Search issues...">
            </div>
          </div>
        </div>

      </div>
    </div>
    <Home v-if="routing == 'Home'"></Home>
    <Member v-if="routing == 'Member'"></Member>
    <Photo v-if="routing == 'Photo'"></Photo>
  </div>
</template>

<script>
  /* eslint-disable */
  import Home from './components/Home.vue'
  import Member from './components/Member.vue'
  import Photo from './components/Photo.vue'

  export default {
    name: 'app',
    components:{
      Home,
      Member,
      Photo
    },
    data () {
      return {
        routing: "Home"
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
    text-align: center;
    color: #2c3e50;
  }

  #sparcs_logo{
    border-color: transparent;
  }

  #login_indicator{
    margin: 10px;
  }

</style>
