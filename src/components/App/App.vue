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

<script src="./App.js"></script>
<style src="./App.css"></style>
