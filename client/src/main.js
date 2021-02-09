import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import cookies from 'vue-cookies';
import 'bulma/css/bulma.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import vueFab from 'vue-float-action-button';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(cookies);
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDThTVxOOn3GXlVb_5YyNJ2AUg3V0OoGRc",
    libraries: "places"
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
