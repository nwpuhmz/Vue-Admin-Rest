import Vue from 'vue'
import VueRouter from 'vue-router'
import viewPageComponent from '@/pages/App'
import homeComponent from '@/pages/home'
import loginComponent from '@/pages/user/login'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes =  [
   {
      path: '/user/login',
      name: 'login',
      component: loginComponent
    },
    {
      path: '/',
      redirect: '/home',
      component: viewPageComponent,
      children:[{
          path: '/home',
          name: 'home',
          component: homeComponent,
          meta: {
            title: "主页",
            auth: true
          }
        }
      ]

    }
  ]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return {x: 0, y: 0}
  //   }
  // }
})
//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router