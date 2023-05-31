import Vue from 'vue'
import App from './App.vue'
import store from './store'
import {BootstrapVue, IconsPlugin} from "bootstrap-vue";

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
