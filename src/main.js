import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import './assets/css/tailwind.css'
import './assets/sass/style.sass'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
