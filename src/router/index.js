import Vue from 'vue'
import VueRouter from 'vue-router'
import viewPageComponent from '@/pages/App'
import homeComponent from '@/pages/home'
import saveItemComponent from "@/pages/home/addItem"
import userManageComponent from "@/pages/user/user_manage"
import saveUserComponent from "@/pages/user/addUser"

import loginComponent from '@/pages/user/login'
import barChartsComponent from '@/pages/tongji/Charts'
//404
import noPageComponent from '@/pages/error/404'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes =  [
    {
      path: '/404',
      name: 'notPage',
      component: noPageComponent
    }, 
    {
      path: '*',
      redirect: '/404'
    },
   {
      path: '/login',
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
        },
         {
            path: '/user',
            name: 'user',
            component: userManageComponent,
            meta: {
              title: "用户管理",
              auth: true
            }
          },
             {
            path: '/user/view/:id',
            name: 'userUpdate',
            component: saveUserComponent,
            meta: {
              title: "用户详情",
              auth: true
            }
          },
             {
            path: '/user/add',
            name: 'userAdd',
            component: saveUserComponent,
            meta: {
              title: "添加用户",
              auth: true
            }
          },
        {
          path: '/item/view/:id',
          name: 'itemUpdate',
          component: saveItemComponent,
          meta: {
            title: "数据修改",
            auth: true
          }
        },
         {
          path: '/item/add',
          name: 'itemAdd',
          component: saveItemComponent,
          meta: {
            title: "添加数据",
            auth: true
              }
          },
           {
            path: '/tongji/charts',
            name: 'tongji',
            component: barChartsComponent,
            meta: {
              title: "图表统计",
              auth: true
            }
          }
    
      ]

    }
   //   {
    //   path: '/table/base',
    //   name: 'tableBase',
    //   component: baseTableComponent,
    //   meta: {
    //     title: "基本表格",
    //     auth: true
    //   }
    // }
  ]

const router = new VueRouter({
  base: '/cms-xz/',
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
  let isAuth = to.meta.auth
  // let fromName = from.name
  let token = store.state.token_info.token
  let user = store.state.user_info.user
  if(isAuth && !token){
     next({
       name: 'login'
     })
  }else{
    if(token && toName === 'user' && user.roles.indexOf('ROLE_admin')<0){
      
      next({
        name:'home'
      })
    }else{
      next()
    }
    
  }
  // if (!token && toName !== 'login') {
  //   next({
  //     name: 'login'
  //   })
  // } else {
  //   if (token && toName === 'login') {
  //     next({
  //       path: '/'
  //     })
  //   } else {
  //     next()
  //   }
  // }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router