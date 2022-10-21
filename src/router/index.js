import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/Layout/LayoutView.vue'
import LoginView from '../views/Login/LoginView.vue'
import HomeView from '../views/Home/HomeView.vue'

// Async function
const GoodsView = ()=> import('../views/Goods/GoodsView.vue')
const ParamsView = ()=> import('../views/Params/ParamsView.vue')
const AdvertView = ()=> import('../views/Advert/AdvertView.vue')
const OrderView = ()=> import('../views/Order/OrderView.vue')
const OrderListView = ()=> import('../views/Order/OrderList/OrderListView.vue')
const OrderBackView = ()=> import('../views/Order/OrderBack/OrderBackView.vue')
const AddGoodsView = ()=> import('../views/Goods/AddGoodsView.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Layout',
    component: LayoutView,
    children: [
      {
        path: '/',
        name: 'Home',
        component: HomeView
      },
      {
        path: '/goods',
        name: 'Goods',
        component: GoodsView
      },
      {
        path: '/add-goods',
        name: 'AddGoods',
        component: AddGoodsView
      },
      {
        path: '/params',
        name: 'Params',
        component: ParamsView
      },
      {
        path: '/advert',
        name: 'Advert',
        component: AdvertView
      },
      {
        path: '/order',
        name: 'Order',
        component: OrderView,
        redirect: '/order/order-list',
        children: [
          {
            path: 'order-list',
            name: 'OrderList',
            component: OrderListView
          },
          {
            path: 'order-back',
            name: 'OrderBack',
            component: OrderBackView
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
