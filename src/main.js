import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import './assets/base.css'

Vue.use(VueRouter)

// Crée une instance de Vue
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
