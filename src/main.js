// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as echarts from 'echarts'  //引入echarts
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts  //挂载在全局
Vue.prototype.$axios = axios
/* eslint-disable no-new */

//钩子函数，访问路由前调用
router.beforeEach((to, from, next) => {
    //路由需要认证
    if (to.meta.requireAuth) {
      //判断store里是否有token
      if (store.state.token) {
        next()
      } else {
        next({
          path: 'login',
          query: { redirect: to.fullPath }
        })
      }
    } else {
      next()
    }
  }
)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
