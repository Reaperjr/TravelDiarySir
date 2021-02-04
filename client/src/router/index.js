import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ForgotPassword from '../views/ForgotPassword.vue'
import FeedView from '../views/FeedView.vue'
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import VueFab from 'vue-float-action-button'
import MyViagem from '../views/MyViagem.vue'

Vue.use(VuePlaceAutocomplete);
Vue.use(VueFab, /* {
  ----------------------
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)

Vue.use(Router)


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'Home' }},
    {
      path: '/feed',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/feed/:id',
      name: 'FeedView',
      component: FeedView
    },
    {
      path: '/my-trips',
      name: 'MyViagem',
      component: MyViagem
    },
  ]
})