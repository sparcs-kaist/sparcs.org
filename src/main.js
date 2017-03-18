import 'semantic-ui-css/semantic.min.css'
import Vue from 'vue'
import App from './components/App'
import router from './router'

Vue.config.productionTip = false

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
