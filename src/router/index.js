import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue'
import CategoryProducts from '../components/CategoryProducts.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ContactUs from '../components/ContactUs.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
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
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/category/:category_id',
      name: 'CategoryProducts',
      component: CategoryProducts
    },
    {
      path: '/product/:product_id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUs
    },
    { path: '*', redirect: '/login' }
  ]
})