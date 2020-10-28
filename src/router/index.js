import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import CategoryProducts from '../components/CategoryProducts.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ProductMessageDetail from '../components/ProductMessageDetail.vue'
import ContactUs from '../components/ContactUs.vue'
import About from '../components/About.vue'
import Login from '../components/Login.vue'
// import Register from '../components/Register.vue'
import AddProduct from '../components/AddProduct.vue'
import ProductsList from '../components/ProductsList.vue'
import ProductMessagesList from '../components/ProductMessagesList.vue'
import GenericError from '../components/GenericError.vue'

import * as firebase from '../firebase/config'
var firebaseAuth = firebase.firebaseAuth

const productCategories = [
  'necklaces',
  'earrings',
  'bangles',
  'candle-holders',
  'latkans',
  'quilled-envelopes',
  'trendy-jewellery',
  'buttons',
  'wooden-necklace-set',
  'trendy-earrings'
]
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/register',
    //   name: 'Register',
    //   component: Register
    // },
    {
      path: '/admin/products-list',
      name: 'ProductsList',
      component: ProductsList,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/admin/add-product',
      name: 'AddProduct',
      component: AddProduct,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/admin/edit-product/:product_id',
      name: 'EditProduct',
      component: AddProduct,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/admin/product-messages-list',
      name: 'ProductMessagesList',
      component: ProductMessagesList,
      beforeEnter: (to, from, next) => {
        firebaseAuth.onAuthStateChanged(function(user) {
          if (!user) {
            next({name: 'Login'})
          } else {
            next()
          }
        })
      }
    },
    {
      path: '/admin/product-message/:message_id',
      name: 'ProductMessageDetail',
      component: ProductMessageDetail
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: `/category/:category_id(${productCategories.join('|')})`,
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
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/error',
      name: 'GenericError',
      component: GenericError
    },
    { path: '*', redirect: '/error' }
  ]
})
