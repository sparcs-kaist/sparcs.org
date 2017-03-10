import Vue from 'vue'
import App from './components/App'
import router from './router'
import '../node_modules/semantic-ui/dist/semantic.min.css'

require('../semantic')

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
