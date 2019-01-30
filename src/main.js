// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import router from './router'
import App from './App'
import store from './store.js'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(Vuetify)
Vue.use(VueGeolocation)

window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
