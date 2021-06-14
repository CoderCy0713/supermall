import Vue from 'vue'
import VueRouter from 'vue-router'

// 1、安装插件
Vue.use(VueRouter);
const home = () => import('views/home/Home');
const category = () => import('views/category/Category');
const cart = () => import('views/cart/Cart');
const profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail');
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/category',
    component: category
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/profile',
    component: profile
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]
// 2、创建路由对象
const router = new VueRouter({
  routes,
  mode:'history'
})

// 3、导出路由对象
export default router
