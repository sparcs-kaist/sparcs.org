
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
