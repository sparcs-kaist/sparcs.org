export default {
  name: 'app',
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    showLogin() {

    },
  },
  mounted() {
    $(window.document).ready(() => {
      $('.ui.secondary.pointing.menu a.item').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
      })
      $('#sparcs_logo').on('click', () => { $('.right.menu a.item').removeClass('active') })
      $('.ui.dropdown').dropdown()
    })
  },
}
