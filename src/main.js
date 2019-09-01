import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/common.scss'

import Vant from 'vant';
import 'vant/lib/index.css';
import store from './store'
import './registerServiceWorker'
import { Toast } from 'vant'

Vue.use(Vant)
Vue.config.productionTip = false
Vue.prototype.$toast = Toast;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
