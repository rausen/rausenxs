import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/test_api'
Vue.config.productionTip = false
Vue.use(SuiVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
