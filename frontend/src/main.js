import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import SuiVue from 'semantic-ui-vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/test_api'
Vue.config.productionTip = false
Vue.use(SuiVue)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
