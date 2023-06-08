import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'

Vue.use(Router)

export default new Router({
  routes: [
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
    }, {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login')
    },{
      path: '/basicinfo',
      name: 'basicinfo',
      meta: {
        requireAuth: true
      },
      component: () => import('@/components/basicinfo')
    },{
      path: '/usermanagement',
      name: 'usermanagement',
      component: () => import('@/components/usermanagement')
    }, {
      path: '/statistics',
      name: 'statistics',
      component: () => import('@/components/statistics')
    },{
      path: '/upload',
      name: 'upload',
      component: () => import('@/components/fileUpload')
    },{
      path: '/pingfen',
      name: 'pingfen',
      component: () => import('@/components/pingfen')
    }
  ]
})
