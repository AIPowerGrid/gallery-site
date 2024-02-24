import App from './App.vue'
import Vue from 'vue'
import router from './router'
import store from './store'
import nats from '@/lib/nats/nats'

nats.getInstance()

Vue.config.productionTip = false

import './assets/css/index.css'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
