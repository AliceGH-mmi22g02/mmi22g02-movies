import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import './assets/base.css';
import { createPinia, PiniaVuePlugin } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


Vue.use(PiniaVuePlugin)
Vue.use(VueRouter)

const pinia  = createPinia()
pinia.use(piniaPluginPersistedstate)


// Crée une instance de Vue
new Vue({
  pinia,
  router,
  render: (h) => h(App)
}).$mount('#app')
