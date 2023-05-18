import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/middletable',
      name: 'Middletable',
      component: () => import('@/components/middletable')
    },
    // {
    //   path: '/demo',
    //   name: 'Demo',
    //   component: () => import('@/components/demo')
    // },
    {
      path: '/questionnaire',
      name: 'questionnaire',
      component: () => import('@/components/questionnaire'),
      beforeEnter: (to, from, next) => {
        next()
     }
      //http://localhost:8080/#/questionnaire/
    },
    {
      path: '/choose',
      name: 'choose',
      component: () => import('@/components/choose')
    },{
      path: '/addque',
      name: 'addque',
      component: () => import('@/components/addque')
    },{
      path: '/usermanagement',
      name: 'usermanagement',
      component: () => import('@/components/usermanagement')
    }

  ]
})
