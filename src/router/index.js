import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Members from '@/components/Members'
import Photos from '@/components/Photos'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/members', name: 'members', component: Members },
    { path: '/photos', name: 'photos', component: Photos }
  ]
})
