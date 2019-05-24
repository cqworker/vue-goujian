import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // path中的路劲不区分大小写
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
