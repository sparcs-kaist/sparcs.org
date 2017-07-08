<template>
  <div class="welcome">
    <div class="centered">
      <div class="logo_home">
        <img class="logo_image" src="./../../static/logo_welcome.png"/>
      </div>
      <div class="message">
        <h1 id="welcome_message" style="color: white; text-align: center">WE MAKE <span style="color: #f1951c">SERVICE</span>,<br>YOU JUST <span style="color: #f1951c">USE</span> IT.</h1>
      </div>
      <div id="goto">
        <a href="/aboutus"><button class="ui inverted button" href="/aboutus">Go to page</button></a>
      </div>
    </div>
    <div class="bottom">
      <div class="linkto">
        <a href="https://www.facebook.com/kaistsparcs/"><i class="facebook icon link" id="facebook" style="color: white"></i></a>
        <a href="https://github.com/sparcs-kaist"><i class="github icon link" id="github" style="color: white"></i></a>
        <a href="mailto:staff@sparcs.org"><i class="mail icon link" id="mail" style="color: white"></i></a>
      </div>
    </div>
  </div>
</template>

<style>
  @media (min-width: 600px) {
    #r_view {
      margin: 0px;
    }

    .welcome {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: url('./../../static/black-and-white-lights-abstract-curves.jpg') no-repeat fixed center center;
      background-size: cover;
      padding: 0;
    }

    .centered {
      width: 100%;
      text-align: center;
    }

    .logo_home {
      padding-top: 20vh;
      display: inline-block;
      width: 498px;
      height: 174px;
      background-size: cover;
      margin: 0 auto;
    }

    .message {
      padding-top: 1vh;
      width: 70%;
      margin: 0 auto;
    }

    h1 {
      font-family: 'Noto Sans', bold, !important;
    }

    #goto {
      padding-top: 3vh;
      width: 50%;
      margin: 0 auto;
      text-align: center;
    }

    .bottom {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      width: 240px;
      left:0px;
      right:0px;
      bottom: 5vh;
    }

    .linkto{
      position: relative;
      margin: 0 auto;
      text-align: center;
    }

    #facebook, #github, #mail{
      font-size: 50px;
    }
  }

  @media (max-width: 600px) {
    #r_view {
      margin: 0px;
    }

    .welcome {
      position: relative;
      width: 100vw;
      height: 100vh;
      background: url('./../../static/black-and-white-lights-abstract-curves.jpg') no-repeat fixed center center;
      background-size: cover;
      padding: 0;
    }

    .centered {
      width: 100%;
      text-align: center;
    }

    .logo_image {
      display: inline-block;
      padding-top: 17vh;
      width: 70%;
      height: 24.5%;
      margin: 0 auto;
    }

    .message {
      display: inline-block;
      padding-top: 1vh;
      margin: 0 auto;
    }

    #welcome_message {
      font-family: 'Noto Sans', bold, !important;
      font-size: 4vw;
    }
    
    #goto {
      padding-top: 5vh;
      width: 50%;
      margin: 0 auto;
      text-align: center;
    }

    .bottom {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      width: 240px;
      left:0px;
      right:0px;
      bottom: 15vh;
    }

    .linkto{
      position: relative;
      margin: 0 auto;
      text-align: center;
    }

    #facebook, #github, #mail{
      font-size: 40px;
    }
  } 
</style>
