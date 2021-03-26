import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
import HomeContent from '../views/homeContent/index.vue'
import weChatPush from '../views/home/index'
import approvalPush from '../views/approvalData/index.vue'
import login from '../views/login.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: index,
    redirect: '/login',
    meta: { title: '加载中' }
  },
  // {
  //   path: '/index',
  //   name: 'index',
  //   component: index,
  //   meta: { title: '加载' }
  // },
  // {
  //   path: '/todoList',
  //   name: 'todoList',
  //   component: todoList,
  //   meta: { title: 'todoList' }
  // },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: { title: 'login' }
  },
  // {
  //   path: '/Home',
  //   name: 'Home',
  //   component: Home,
  //   meta: { title: '首页' }
  // },
  {
    path: '/',
    name: '',
    component: HomeContent,
    redirect: '/todoList',
    meta: { title: '主页' },
    children: [
      // {
      //   path: '/todoList',
      //   name: 'todoList',
      //   component: todoList,
      //   meta: { title: 'todoList' }
      // },
      {
        path: '/weChatPush',
        name: 'weChatPush',
        component: weChatPush,
        meta: { title: '考勤记录' }
      },
      {
        path: '/approvalPush',
        name: 'approvalPush',
        component: approvalPush,
        meta: { title: '推送设置' }
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
