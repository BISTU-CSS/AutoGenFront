import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/middletable',
      name: 'Middletable',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/middletable')
    },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/questionnaire'),
      beforeEnter: (to, from, next) => {
        next()
     }
      //http://localhost:8080/#/questionnaire/
    },
    {
      path: '/choose',
      name: 'choose',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/choose')
    },{
      path: '/addque',
      name: 'addque',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/addque')
    },{
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },

  ],
})
