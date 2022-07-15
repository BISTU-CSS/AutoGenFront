import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Section531',
      name: 'Section531',
      component: () => import('@/components/Section531')
    },
    {
      path: '/',
      name: 'demo',
      component: () => import('@/components/demo')
    },
    {
      path: '/device',
      name: 'ChooseDevice',
      component: () => import('@/components/ChooseDevice')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/test')
    }
  ]
})
