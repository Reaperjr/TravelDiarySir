import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import cookies from 'vue-cookies';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import vueFab from 'vue-float-action-button';

Vue.use(cookies);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
