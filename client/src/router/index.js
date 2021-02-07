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
import Profile from '../views/Profile.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.use(VuePlaceAutocomplete);
Vue.use(VueFab, /* {
  ----------------------
  // opitons 可选iconfont图标或MaterialIcons
  iconType: 'MaterialDesign'
  // iconType: 'iconfont'
} */)

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: { name: 'Login' } },
    {
      path: '/feed/:id',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
    }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
    }
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword,
      meta: {
        guest: true
    }
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/feed/:id/view/:id_viagens',
      name: 'FeedView',
      component: FeedView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-trips/:id',
      name: 'MyViagem',
      component: MyViagem,
      meta: {
        requiresAuth: true
      }
    },
  ]
})


export default router